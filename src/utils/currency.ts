import { MyBig } from "@/lib/big";

// 将**“元”转换为“分”**
export const toCent = (amount: number) =>
  new MyBig(amount).mul(100).round(2).toNumber();

// 将**“分”转换为“元”**
export const fromCent = (amount: number) =>
  new MyBig(amount).div(100).round(2).toNumber();

// 美元
export const toCurrencyFromCent = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
};

// 人名币
export const toCurrencyFromCentCNY = (amount: number) => {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
  }).format(fromCent(amount));
};
