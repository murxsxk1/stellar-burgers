import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearConstructor } from '../../services/slices/constructor';
import { createOrder, clearOrder } from '../../services/slices/newOrder';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state: RootState) =>
      state.burgerConstructor?.constructorItems || {
        bun: null,
        ingredients: []
      }
  );

  const orderRequest = useSelector(
    (state: RootState) => state.newOrder.loading
  );
  const orderModalData = useSelector(
    (state: RootState) => state.newOrder.order
  );

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const onOrderClick = () => {
    if (!constructorItems?.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun!._id,
      ...constructorItems.ingredients.map((ingredirent) => ingredirent._id),
      constructorItems.bun!._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
