import axios from "axios";
import api from "./api";

export const getIssuesByArea =  (areaId) => {
    const response =  api.get(`/issue/get-issues-area/${areaId}`);
    // console.log(response);
    return response;
}

export const createNewIssue = (formData) => {
    console.log(formData);
    const response = api.post('/issue/create-new-issue', formData);
    return response;
}