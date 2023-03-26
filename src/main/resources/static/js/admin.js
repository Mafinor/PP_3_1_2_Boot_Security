import { User } from "./domain.js";
import repo from "./repository.js";
import {
    viewMenu,
    viewUserInfo,
    viewUsersListing,
    viewUserAdd,
    viewModalDeleteUser,
    viewModalEditUser,
    showModal,
} from "./views.js";

$(document).ready(async function () {
    const iam = await repo.whoAmI();
    const users = await repo.getUsers();
    const roles = await repo.getRoles();

    renderUserInfo(iam);
    renderUsersListing(users, roles);
    renderUserAddForm(roles);
});

function renderUserInfo(iam) {
    $("#view--menu").html(viewMenu(iam));
    $("#view--user_info").html(viewUserInfo(iam));
}

function renderUsersListing(users, roles) {
    const usersListing = $("#view--users_listing").html(
        viewUsersListing(users)
    );

    usersListing.find("[data-edit-user]").on("click", async (event) => {
        const userId = $(event.target).data("user-id");
        const user = await repo.getUser(userId);

        showModal(viewModalEditUser(user, roles))
            .find("form")
            .on("submit", (event) => {
                event.preventDefault();
                const user = _getUserDataFromForm(event.target, roles);
                repo.updateUser(user)
                    .then(async (user) => {
                        const users = await repo.getUsers();
                        renderUsersListing(users, roles);
                    })
                    .catch(({ error }) => {
                        $(event.target)
                            .find("[data-error-message]")
                            .text(error)
                            .show();
                    });
            });
    });

    usersListing.find("[data-delete-user").on("click", async (event) => {
        const userId = $(event.target).data("user-id");
        const user = await repo.getUser(userId);

        showModal(viewModalDeleteUser(user, roles))
            .find("form")
            .on("submit", (event) => {
                event.preventDefault();
                repo.deleteUser(userId).then(async () => {
                    const users = await repo.getUsers();
                    renderUsersListing(users, roles);
                });
            });
    });
}

function renderUserAddForm(roles) {
    $("#view--user_add")
        .html(viewUserAdd(User.empty(), roles))
        .find("form")
        .on("submit", async (event) => {
            event.preventDefault();
            const user = _getUserDataFromForm(event.target, roles);
            repo.addUser(user)
                .then(async (data) => {
                    renderUserAddForm(roles);
                    const users = await repo.getUsers();
                    renderUsersListing(users, roles);
                    // go to users listing tab
                    const userListTab = $('a[href="#user-list"]').get(0);
                    bootstrap.Tab.getInstance(userListTab).show();
                })
                .catch(({ error }) => {
                    $(event.target)
                        .find("[data-error-message]")
                        .text(error)
                        .show();
                });
        });
}

function _getUserDataFromForm(formElement, roles) {
    const data = new FormData(formElement);
    const user = Object.fromEntries(data.entries());
    const selectedRoleIds = data.getAll("roles").map((r) => parseInt(r));
    user.roles = roles.filter((role) => selectedRoleIds.includes(role.id));
    user.id = $(formElement).find("input[name=id]").val();

    return user;
}