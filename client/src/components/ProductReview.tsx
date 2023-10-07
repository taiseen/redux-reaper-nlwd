import {
  useGetProductCommentQuery,
  usePostCommentForProductMutation,
} from '@/redux/feature/product/productApi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { Button } from './ui/button';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');

  // 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
  // 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢

  // POST ➡️ network call - for send updated data to server
  const [postCommentForProduct, options] = usePostCommentForProductMutation();

  // GET ➡️ network call - for fetch updated data from server
  const { data, isLoading, error } = useGetProductCommentQuery(id, {
    // 🤔 go another component & comeback again this component to GET updated data ||
    // 🤔 unmount & mount again this component to GET updated data
    refetchOnMountOrArgChange: true,

    // 😯 every 10 second, this component auto GET network call for updated data...
    // 😎 every 10 second, see others updated data that they send to server
    pollingInterval: 10_000, // 10 second
  });

  // 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
  // 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sendComment = {
      id,
      data: { comment: inputValue },
    };

    postCommentForProduct(sendComment);

    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setInputValue(event.target.value);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>

      <div className="mt-10">
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            {comment !== null && (
              <>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <p>{comment}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
