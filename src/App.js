// App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { setProducts, setCart } from './productsSlice';
import CartPage from './CartPage';
import { store } from './store';
import product from './product.json';
console.log(product?.products)
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(product?.products));
    dispatch(setCart(product?.products));

  }, [dispatch]);

  return (
    <Provider store={store}>
      {/* Consider wrapping the entire application in a parent div */}
      <div>
        {/* Add a header or navigation bar */}
        <header>
          <h1>My Shopping App</h1>
        </header>

        {/* Render the CartPage component */}
        <CartPage />

        {/* Add a footer */}
        <footer>
          <p>&copy; 2024 My Shopping App</p>
        </footer>
      </div>
    </Provider>
  );
};

export default App;
