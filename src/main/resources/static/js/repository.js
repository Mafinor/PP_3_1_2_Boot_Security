import { User, Role } from "./domain.js";

function whoAmI() {
    return fetch("/api/v1/iam")
        .then((response) => response.json())
        .then(User.fromJson);
}

function getUsers() {
    return fetch("/api/v1/users")
        .then((response) => response.json())
        .then((data) => data.map(User.fromJson));
}

function getRoles() {
    return fetch("/api/v1/roles")
        .then((response) => response.json())
        .then((data) => data.map(Role.fromJson));
}

function getUser(userId) {
    return fetch(`/api/v1/users/${userId}`)
        .then((response) => response.json())
        .then(User.fromJson);
}

function addUser(user) {
    return fetch("/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then(_resolveOrReject)
        .then(User.fromJson);
}

function deleteUser(userId) {
    return fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
    });
}

function updateUser(user) {
    return fetch(`/api/v1/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then(_resolveOrReject)
        .then(User.fromJson);
}

async function _resolveOrReject(response) {
    const data = await response.json();

    if (!response.ok) {
        return Promise.reject(data);
    }

    return Promise.resolve(data);
}

export default {
    whoAmI,
    getUsers,
    getRoles,
    getUser,
    addUser,
    deleteUser,
    updateUser,
};