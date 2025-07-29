import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeeds } from '../../services/slices/feeds';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feeds.orders);
  const loading = useSelector((state) => state.feeds.loading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (loading || !orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
