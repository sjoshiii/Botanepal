import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const amount = getCartAmount ? getCartAmount() : 0;

  return (
    <div className='w-full'>
      <div className='text-2xl'>
       
         <Title text1={"C"} text2={"ART"} />&nbsp;&nbsp;&nbsp;
         <Title text1={"T"} text2={"OTALS"} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Total Amount:</p>
          <p>{currency}{amount.toFixed(2)}</p>
        </div>

        <hr />

        <div className='flex justify-between'>
          <p>Shipping Fee:</p>
          <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>

        <hr />

        <div className='flex justify-between'>
          <b>Total:</b>
          <b>{currency}{amount === 0 ? '0.00' : (amount + delivery_fee).toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
