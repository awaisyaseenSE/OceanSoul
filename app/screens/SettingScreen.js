import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';

export default function SettingScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      setLoading(true);
      const apiKey = 'dafd5187be5b5ada05f761e64d42fe082068912b';
      const requestParameters = new URLSearchParams({
        key: apiKey,
        format: 'pretty',
        limit: '10',
      });

      const response = await fetch(
        `https://rebuyengine.com/api/v1/products/trending_products?${requestParameters}`,
      );

      if (!response.ok) {
        const errorResponse = await response.text(); // Fetch the error message from the response
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorResponse}`,
        );
      }
      const data = await response.json();
      // console.log(data?.data?.length);
      setProducts(data?.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trending products:', error);
      setLoading(false);
    }
  };
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View>
          <Text>Setting Screen</Text>
          {loading && <ActivityIndicator size={'large'} color={colors.black} />}
        </View>
      </ScreenComponent>
    </>
  );
}
