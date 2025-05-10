import RequestService from "../configuration/AxiosConfig";

const controller="User/"

const User={
create:async data =>RequestService.post(controller.concat("save"),data),
getUserList:async ()=>RequestService.get(controller.concat("getAll")),
getUserDetail:async id =>RequestService.get(controller.concat(`getUserById/${id}`)),
update:async data =>RequestService.put(controller.concat("update"),data),
};
export default User;