import {CommonShopBench} from "./CommonShopBench";
import {shopPotions} from "../constants";

const BossShop = () => {
    return <CommonShopBench
        title="Boss Shop"
        items={shopPotions}
        type="boss"
        currencyIcon="icon-boss"
    />
}

export { BossShop };
