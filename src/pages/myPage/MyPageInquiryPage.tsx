import { useEffect, useState } from "react";

import {
  getInquiryContact,
  type InquiryContact,
} from "../../apis/users";
import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import MyPageEmailModal from "../../components/myPage/MyPageEmailModal";

const KAKAO_INQUIRY_URL = "https://open.kakao.com/o/sXFnnHFi";
const DEFAULT_INQUIRY_EMAIL = "rosalim2001@gmail.com";

const MyPageInquiryPage = () => {
  const [contact, setContact] =
    useState<InquiryContact | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] =
    useState(false);

  useEffect(() => {
    const loadContact = async () => {
      try {
        setContact(await getInquiryContact());
      } catch (error) {
        console.error(error);
      }
    };

    void loadContact();
  }, []);

  const handleKakaoClick = () => {
    window.open(
      KAKAO_INQUIRY_URL,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleEmailClick = () => {
    setIsEmailModalOpen(true);
  };

  const inquiryEmail =
    contact?.email || DEFAULT_INQUIRY_EMAIL;

  return (
    <main className="min-h-full px-[232px] pb-[120px] pt-[40px]">
      <MyPageBackHeader title="1:1 문의" />

      <section className="ml-[53px] mt-[65px] flex w-[687px] max-w-[calc(100%_-_53px)] flex-col gap-[19px]">
        <button
          type="button"
          onClick={handleKakaoClick}
          className="flex h-[66px] w-full items-center justify-center rounded-[5px] bg-[#1F212A] p-[10px] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#FAFAFA] transition-colors hover:bg-[#42444C]"
        >
          카카오톡 문의하기
        </button>

        <button
          type="button"
          onClick={handleEmailClick}
          className="flex h-[66px] w-full items-center justify-center rounded-[5px] bg-[#1F212A] p-[10px] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#FAFAFA] transition-colors hover:bg-[#42444C]"
        >
          이메일 문의하기
        </button>
      </section>

      <MyPageEmailModal
        isOpen={isEmailModalOpen}
        email={inquiryEmail}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </main>
  );
};

export default MyPageInquiryPage;