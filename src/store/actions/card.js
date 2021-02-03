import * as actionTypes from "./actionTypes";
import { withAuth } from "../../utils/axios";

export const createCard = (form, projectId, categoryId, cb) => async (
  dispatch
) => {
  try {
    const { title, description } = form;

    const response = await withAuth().post("/cards", {
      description,
      title,
      projectId,
      categoryId,
    });

    dispatch({
      type: actionTypes.CARD_CREATE,
      payload: { ...response.data },
    });

    cb();
  } catch (e) {}
};

export const deleteCard = (_id, categoryId) => async (dispatch) => {
  try {
    await withAuth().delete(`/cards/${_id}`);

    dispatch({
      type: actionTypes.CARD_DELETE,
      payload: { _id, categoryId },
    });
  } catch (e) {}
};

export const editCard = (form, projectId, categoryId, cb) => async (
  dispatch
) => {
  try {
    const { _id, title, description } = form;

    const response = await withAuth().put(`/cards/${_id}`, {
      title,
      description,
      projectId,
      categoryId,
    });

    dispatch({
      type: actionTypes.CARD_UPDATE,
      payload: { ...response.data },
    });

    cb();
  } catch (e) {}
};
