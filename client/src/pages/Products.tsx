import ProductCard from '@/components/ProductCard';
import { useGetAllProductsQuery } from '@/redux/api/apiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { IProduct } from '@/types/globalTypes';
import { Label } from '@/components/ui/label';
import { Key } from 'react';
import {
  setPriceRange,
  toggleStage,
} from '@/redux/feature/product/productSlice';

export default function Products() {
  const dispatch = useAppDispatch();
  const { status, priceRange } = useAppSelector((state) => state.product);

  // 🟢🟢🟢 new way of data fetching - by network call...
  const { data, error, isLoading } = useGetAllProductsQuery(undefined);

  // 🔴🔴🔴 old way of data fetching - by network call...
  // const [data, setData] = useState<IProduct[]>([]);
  // useEffect(() => {
  //   fetch('./data.json')
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  const { toast } = useToast();

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

  let productsData;

  if (status) {
    productsData = data?.data.filter(
      (item: { status: boolean; price: number }) =>
        item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = data?.data.filter(
      (item: { price: number }) => item.price < priceRange
    );
  } else {
    productsData = data?.data;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>

          <div
            className="flex items-center space-x-2 mt-3"
            onClick={() => dispatch(toggleStage())}
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>

        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>

          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>

          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>

      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct, idx: Key | null | undefined) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}
