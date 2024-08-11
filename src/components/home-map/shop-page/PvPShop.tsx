import {CommonShopBench} from "./CommonShopBench";
import {shopPotions} from "../constants";

const PvPShop = () => {
    return <CommonShopBench
        title="PvP Shop"
        items={shopPotions}
        type="pvp"
        currencyIcon="icon-pvp-2"
    />
}

export { PvPShop };
