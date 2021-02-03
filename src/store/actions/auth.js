import * as actionTypes from "./actionTypes";
import { withAuth } from "../../utils/axios";

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.AUTH_LOGIN,
      payload: "",
    });
  } catch (e) {}
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.AUTH_LOGOUT,
    });
  } catch (e) {}
};

export const checkToken = () => async (dispatch) => {
  try {
    const projects = await withAuth().get("/projects");

    const categories = await withAuth().get("/categories");

    const cards = await withAuth().get("/cards");

    dispatch({
      type: actionTypes.SET_PROJECTS,
      payload: projects.data,
    });

    dispatch({
      type: actionTypes.SET_CATEGORIES,
      payload: categories.data.map((el) => ({
        _id: el._id,
        name: el.name,
        category: el.name,
        projectId: el.projectId,
        cards:
          cards.data && cards.data.length > 0
            ? cards.data.filter((card) => card.categoryId === el._id)
            : [],
      })),
    });

    dispatch({
      type: actionTypes.AUTH_CHECK_TOKEN,
      payload: false,
    });
  } catch (e) {}
};
