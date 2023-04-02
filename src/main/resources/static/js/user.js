import { viewMenu, viewUserInfo } from "./views.js";
import repo from "./repository.js";

$(document).ready(function () {
    repo.whoAmI().then((iam) => {
        $("#view--menu").html(viewMenu(iam));
        $("#view--user_info").html(viewUserInfo(iam));
    })
});