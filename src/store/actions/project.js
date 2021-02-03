import * as actionTypes from "./actionTypes";
import { withAuth } from "../../utils/axios";

export const createProject = (form) => async (dispatch) => {
  try {
    const { name } = form;

    const response = await withAuth().post("/projects", { name, user: "user" });

    dispatch({
      type: actionTypes.PROJECT_CREATE,
      payload: { ...response.data },
    });
  } catch (e) {}
};

export const deleteProject = (_id) => async (dispatch) => {
  try {
    await withAuth().delete(`/projects/${_id}`);

    dispatch({
      type: actionTypes.PROJECT_DELETE,
      payload: _id,
    });
  } catch (e) {}
};

export const editProject = (form) => async (dispatch) => {
  try {
    const { _id, name } = form;

    const response = await withAuth().put(`/projects/${_id}`, {
      name,
      user: "user",
    });

    dispatch({
      type: actionTypes.PROJECT_UPDATE,
      payload: { ...response.data },
    });
  } catch (e) {}
};
