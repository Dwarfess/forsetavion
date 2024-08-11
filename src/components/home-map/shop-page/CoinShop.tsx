import { CommonShopBench } from "./CommonShopBench";
import { shopPotions } from "../constants";

const CoinShop = () => {
    return <CommonShopBench
        title="Coin Shop"
        items={shopPotions}
        type="coin"
        currencyIcon="indicator-coins"
    />
}

export { CoinShop };
