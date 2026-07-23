import MyPageAuthRequired from "../../components/myPage/MyPageAuthRequired";

const MyPageAuthRequiredPage = () => {
  return (
    <main className="flex min-h-full flex-col px-[160px] pb-[120px] pt-[40px]">
      <h1 className="text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
        마이페이지
      </h1>

      <MyPageAuthRequired />
    </main>
  );
};

export default MyPageAuthRequiredPage;