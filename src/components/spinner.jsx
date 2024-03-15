const Spinner = () => {
  return (
    <div class="flex space-x-2 justify-center items-center bg-white my-20">
      <span class="sr-only">Loading...</span>
      <div class="h-8 w-8 bg-black rounded-full animate-bounce]"></div>
      <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default Spinner;
