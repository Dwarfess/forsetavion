import {CommonShopBench} from "./CommonShopBench";
import {shopPotions} from "../constants";

const SphereShop = () => {
    return <CommonShopBench
        title="Sphere Shop"
        items={shopPotions}
        type="coin"
        currencyIcon="indicator-sphere"
    />
}

export { SphereShop };
