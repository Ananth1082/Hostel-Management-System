import H3 from "../Typography/H3";
import BuyCouponAlert from "./BuyCouponAlert";

export default function BuyCoupon() {
  return (
    <div className="grid place-content-center">
      <H3>Don't have a coupon?</H3>
      <br />
      <BuyCouponAlert></BuyCouponAlert>
    </div>
  );
}
