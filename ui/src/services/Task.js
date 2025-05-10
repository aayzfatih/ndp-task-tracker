import RequestService from "../configuration/AxiosConfig";

const controller="Task/"

const Task={
getSelectList:async ()=>RequestService.get(controller.concat("getSelectList")),
getTaskList:async ()=>RequestService.get(controller.concat("getAll")),
getTaskDetail:async (id)=>RequestService.get(controller.concat(`getById/${id}`)),
create:async (data)=>RequestService.post(controller.concat("create"),data),
update:async (data)=>RequestService.put(controller.concat("update"),data),
};
export default Task;