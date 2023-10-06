import ProductReview from '@/components/ProductReview';
import { useGetSingleProductQuery } from '@/redux/api/apiSlice';
import { addToCart } from '@/redux/feature/cart/cartSlice';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { IProduct } from '@/types/globalTypes';
import { useAppDispatch } from '@/redux/hook';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data: product, error, isLoading } = useGetSingleProductQuery(id);

  // //! Temporary code, should be replaced with redux
  // const [data, setData] = useState<IProduct[]>([]);
  // useEffect(() => {
  //   fetch('../../public/data.json')
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  // const product = data?.find((item: IProduct) => item._id === Number(id));
  // //! Temporary code ends here

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));

    toast({
      description: 'Product Added',
    });
  };

  if (isLoading) {
    return <p>Loading... 🔴🔴🔴</p>;
  }

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>

        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>

          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature: string) => (
              <li key={feature}>
                <strong>*</strong> {feature},
              </li>
            ))}
          </ul>

          <Button onClick={() => handleAddProduct(product!)}>
            Add to cart
          </Button>
        </div>
      </div>

      <ProductReview />
    </>
  );
}
