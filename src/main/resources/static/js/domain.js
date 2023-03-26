export class User {
    constructor({
                    id = -1,
                    firstName = "",
                    lastName = "",
                    age = 0,
                    email = "",
                    password = "",
                    roles = [],
                }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.roles = roles.map(Role.fromJson);
    }

    static fromJson(json) {
        return new User(json);
    }

    static empty() {
        return new User({});
    }
}

export class Role {
    constructor({ id = -1, name = "" }) {
        this.id = id;
        this.name = name;
    }

    static fromJson(json) {
        return new Role(json);
    }

    getSimpleName() {
        return this.name.substring(5);
    }
}