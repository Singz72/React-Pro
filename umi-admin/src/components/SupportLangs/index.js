import React from "react";

const LangsInit = {
  en: "英语",
  es: "西班牙语",
  ar: "阿拉伯语"
};

const SupportLangs = ({ langs }) => {
  // 添加key，防止警告
  const arr =
    langs.length > 0
      ? langs.split(",").map((cur, idx) => ({
          text: cur,
          unique: idx
        }))
      : [];
  return (
    <div style={{ marginBottom: "16px", color: "#2593fc" }}>
      您的商城支持语言：中文
      {arr.map(cur => (
        <span key={cur.unique}>、{LangsInit[cur.text]}</span>
      ))}
    </div>
  );
};

export default SupportLangs;
