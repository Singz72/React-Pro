import { parse } from "querystring";
import pathRegexp from "path-to-regexp";
import { message } from "antd";
import request from "@/utils/request";
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const getPageQuery = () => parse(window.location.href.split("?")[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ path }) => path && pathRegexp(path).exec(pathname)
  );
  if (authority) return authority;
  return undefined;
};

const { decodeURIComponent } = window;

export const getQuery = key => {
  const { location } = window;
  const query = {};
  if (location.search.indexOf("**") > -1) {
    const parameter = location.search.slice(1).split("**");
    parameter.forEach(item => {
      const queryPair = item.split("/");
      const [a, b] = queryPair;
      if (a.indexOf("?") > -1) {
        queryPair[0] = a;
      }
      query[a] = b;
    });
  } else if (location.search.indexOf("&") > -1) {
    location.search
      .slice(1)
      .split("&")
      .forEach(item => {
        const queryPair = item.split("=");
        const [a, b] = queryPair;
        query[a] = b;
      });
  } else if (location.search.indexOf("=") > -1) {
    const arr = location.search.slice(1).split("=");
    const [a, b] = arr;
    query[a] = b;
  } else if (location.search.indexOf("/") > -1) {
    const arr = location.search.slice(1).split("/");
    const [a, b] = arr;
    query[a] = b;
  }
  // console.log(query)

  const rst = query[key];

  return rst ? decodeURIComponent(query[key]) : "";
};

export const isJsonString = str => {
  try {
    if (typeof JSON.parse(str) === "object") {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const checkToken = () => {
  const token = sessionStorage.getItem("mat");
  if (!token) {
    return false;
  }
  return token;
};

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const handleDate = (t, hours = true) => {
  const T = new Date(t);
  const Y = T.getFullYear(T);
  const M = T.getMonth() + 1;
  const D = T.getDate();
  if (hours) {
    const H = T.getHours();
    const Min = T.getMinutes();
    const S = T.getSeconds();
    return `${Y}-${M < 10 ? `0${M}` : M}-${D < 10 ? `0${D}` : D} ${
      H < 10 ? `0${H}` : H
    }:${Min < 10 ? `0${Min}` : Min}:${S < 10 ? `0${S}` : S}`;
  }
  return `${Y}-${M}-${D}`;
};

/**
 *
 * @param {array} data antd时间选择器范围值
 */

export const onDate = data => {
  // eslint-disable-next-line no-underscore-dangle
  const T1 = handleDate(data[0]._d, false);
  // eslint-disable-next-line no-underscore-dangle
  const T2 = handleDate(data[1]._d, false);
  return [T1, T2];
};

export const handlePrice = p => {
  if (!!Number(p) || Number(p) === 0) {
    let str = String(p);
    const idx = str.indexOf(".");
    if (idx > -1) {
      str = `${str}0`;
      return `${str.slice(0, idx + 3)}`;
    }
    return `${str}.00`;
  }
  return "";
};

export const getAuth = () => {
  const arr = localStorage.getItem("db-authority").slice(1, -1);
  return arr;
};

export const validateEmail = email => {
  const regexp = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
  return regexp.test(email);
};

export const validatePhone = phone => {
  const regexp = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
  return regexp.test(phone);
};
