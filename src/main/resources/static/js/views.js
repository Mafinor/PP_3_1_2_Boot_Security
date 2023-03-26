import { User, Role } from "./domain.js";

/**
 * Site menu
 *
 * @param {User} user
 * @returns {string}
 */
export function viewMenu(user) {
    return `
        <nav class="navbar navbar-dark bg-dark mb-4">
            <div class="container-fluid">
                <div class="navbar-text text-light">
                    <span class="fw-bold">${user.email}</span>
                    with roles:
                    ${viewRoles(user.roles)}
                </div>
                <a class="link-secondary text-capitalize text-decoration-none" href="/logout">logout</a>
            </div>
        </nav>
    `;
}

/**
 * Roles listing
 *
 * @param {Role[]} roles
 * @returns {string}
 */
function viewRoles(roles) {
    return roles
        .map((role) => `<span class="ms-1">${role.getSimpleName()}</span>`)
        .join("");
}

/**
 * User info card
 * @param {User} user
 * @returns {string}
 */
export function viewUserInfo(user) {
    return `
        <div class="card">
            <div class="card-header fw-bold">About user</div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${viewRoles(user.roles)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/**
 * Users listing
 *
 * @param {User[]} users
 * @returns {string}
 */
export function viewUsersListing(users) {
    /**
     * @param {User} user
     */
    const viewUserRow = ({ id, firstName, lastName, age, email, roles }) => `
            <tr data-user-row=${id}>
                <td>${id}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${age}</td>
                <td>${email}</td>
                <td>${viewRoles(roles)}</td>
                <td>
                    <a type="button" 
                       class="btn btn-info text-light"
                       data-edit-user
                       data-user-id="${id}">Edit</a>
                <td>
                    <a type="button" 
                       class="btn btn-danger"
                       data-delete-user
                       data-user-id="${id}">Delete</a>
                </td>
            </tr>
        `;

    return `
        <div class="card">
            <div class="card-header fw-bold">All users</div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${users.map(viewUserRow).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/**
 * @param {User} user
 * @param {Role[]} roles
 * @param {Object} attributes
 * @returns {string}
 */
function viewUserRolesField(user, roles, attributes = {}) {
    const roleOption = (role, isActive) => `
            <option value="${role.id}" ${isActive ? "selected" : ""}>
                ${role.getSimpleName()}
            </option>
        `;

    return `
        <label class="form-label fw-bold d-block">Role
            <select id="roles"
                    class="form-control"
                    multiple
                    name="roles"
                    required
                    ${Object.entries(attributes)
        .map(([name, value]) => `${name} = ${value}`)
        .join(" ")}>
                ${roles
        .map((role) =>
            roleOption(
                role,
                user.roles.some((r) => r.id === role.id)
            )
        )
        .join("")}
            </select>
        </label>
    `;
}

/**
 * Add user form
 *
 * @param {User} user
 * @param {Role[]} roles
 * @returns {string}
 */
export function viewUserAdd(user, roles) {
    return `
        <div class="card">
            <div class="card-header fw-bold">Add new user</div>
            <div class="card-body">
                <div class="row justify-content-center">
                    <div class="col-3 text-center">
                        <form>
                            <div class="mb-3">
                                <label class="form-label d-block fw-bold">First name
                                    <input type="text" 
                                           class="form-control" 
                                           name="firstName"
                                           placeholder="First name"> 
                                </label>
                            </div>

                            <div class="mb-3">
                                <label class="form-label d-block fw-bold">Last name
                                    <input type="text" 
                                           class="form-control" 
                                           name="lastName"
                                           placeholder="Last name">
                                </label>
                            </div>

                            <div class="mb-3">
                                <label class="form-label d-block fw-bold">Age
                                    <input type="number" 
                                           class="form-control" 
                                           name="age"
                                           placeholder="Age">
                                </label>
                            </div>

                            <div class="mb-3">
                                <label class="form-label d-block fw-bold">Email
                                    <input type="email" 
                                           required 
                                           class="form-control" 
                                           name="email"
                                           placeholder="Email">
                                </label>
                            </div>

                            <div class="mb-3">
                                <label class="form-label d-block fw-bold">Password
                                    <input type="password" 
                                           required
                                           class="form-control" 
                                           name="password"
                                           placeholder="Password">
                                </label>
                            </div>

                            <div class="mb-3">
                                ${viewUserRolesField(user, roles)}
                            </div>

                            <div class="alert alert-warning text-center mb-3" 
                                 data-error-message
                                 style="display: none;"></div>

                            <input class="btn btn-success" type="submit" value="Add new user">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Delete user modal
 *
 * @param {User} user
 * @param {Role[]} roles
 * @returns {string}
 */
export function viewModalDeleteUser(user, roles) {
    return `
        <div class="modal fade" data-modal-delete-user>
            <form>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="modal-title fw-bold">Delete user</span>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="row justify-content-center">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="fw-bold d-block fw-bold">ID
                                            <input type="text"
                                                class="form-control"
                                                disabled
                                                value="${user.id}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="fw-bold d-block fw-bold">First name
                                            <input type="text"
                                                class="form-control"
                                                disabled
                                                value="${user.firstName}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="fw-bold d-block fw-bold">Last name
                                            <input type="text"
                                                class="form-control"
                                                disabled
                                                name="lastName"
                                                value="${user.lastName}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="fw-bold d-block fw-bold">Age
                                            <input type="number"
                                                class="form-control"
                                                disabled
                                                name="age"
                                                value="${user.age}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="fw-bold d-block fw-bold">Email
                                            <input type="text"
                                                class="form-control"
                                                disabled
                                                name="email"
                                                value="${user.email}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        ${viewUserRolesField(user, roles, {
        disabled: true,
    })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `;
}

/**
 * Edit user modal
 *
 * @param {Role[]} roles
 * @param {User} user
 * @returns {string}
 */
export function viewModalEditUser(user, roles) {
    return `
        <div class="modal fade" data-modal-edit-user>
            <form>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="modal-title fw-bold">Edit user</span>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="row justify-content-center">
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold d-block">ID
                                            <input type="text" 
                                                class="form-control" 
                                                disabled 
                                                name="id" 
                                                value="${user.id}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label fw-bold d-block">First name
                                            <input type="text"
                                                class="form-control"
                                                name="firstName"
                                                value="${user.firstName}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label fw-bold d-block">Last name
                                            <input type="text"
                                                class="form-control"
                                                name="lastName"
                                                value="${user.lastName}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label fw-bold d-block">Age
                                            <input type="number"
                                                min="0"
                                                class="form-control"
                                                name="age"
                                                value="${user.age}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label fw-bold d-block">Email
                                            <input type="text"
                                                class="form-control"
                                                name="email"
                                                value="${user.email}">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label fw-bold d-block">Password
                                            <input type="password"
                                                class="form-control"
                                                name="password">
                                        </label>
                                    </div>

                                    <div class="mb-3">
                                        ${viewUserRolesField(user, roles)}
                                    </div>

                                    <div class="alert alert-warning text-center mb-3" 
                                            data-error-message
                                            style="display: none;"></div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Edit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `;
}

export function showModal(html) {
    const element = $(html).get(0);
    $("body").append(element);

    const modal = new bootstrap.Modal(element);
    modal.show();

    return $(element).on("hidden.bs.modal", () => {
        // Remove Bootstrap Modal instance
        modal.dispose();
        // Remove DOM Element
        element.remove();
    });
}