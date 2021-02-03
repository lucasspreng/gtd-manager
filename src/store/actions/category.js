import * as actionTypes from "./actionTypes";
import { withAuth } from "../../utils/axios";

export const createCategory = (form, projectId) => async (dispatch) => {
  try {
    const { name } = form;

    const response = await withAuth().post("/categories", {
      name,
      projectId,
    });

    dispatch({
      type: actionTypes.CATEGORY_CREATE,
      payload: { ...response.data },
    });
  } catch (e) {}
};

export const deleteCategory = (_id) => async (dispatch) => {
  try {
    await withAuth().delete(`/categories/${_id}`);

    dispatch({
      type: actionTypes.CATEGORY_DELETE,
      payload: _id,
    });
  } catch (e) {}
};

export const editCategory = (form, projectId) => async (dispatch) => {
  try {
    const { _id, name } = form;

    const response = await withAuth().put(`/categories/${_id}`, {
      name,
      projectId,
    });

    dispatch({
      type: actionTypes.CATEGORY_UPDATE,
      payload: { ...response.data },
    });
  } catch (e) {}
};
