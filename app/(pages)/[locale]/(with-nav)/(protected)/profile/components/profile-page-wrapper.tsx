type ProfilePageWrapperProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function ProfilePageWrapper({
  children,
  title,
  description,
}: ProfilePageWrapperProps) {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
            {title}
          </h1>
          <p className='mt-2 text-sm text-gray-500'>{description}</p>
        </div>
      </div>
      <div className='mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
        {children}
      </div>
    </div>
  );
}
