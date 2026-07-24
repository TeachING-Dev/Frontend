import { useEffect, useState } from "react";

import {
  getInquiryContact,
  type InquiryContact,
} from "../../apis/users";
import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";

const MyPageInquiryPage = () => {
  const [contact, setContact] =
    useState<InquiryContact | null>(null);

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
    if (contact?.kakaoChannelUrl) {
      window.open(
        contact.kakaoChannelUrl,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const handleEmailClick = () => {
    if (contact?.email) {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <main className="min-h-full px-[160px] pb-[120px] pt-[40px]">
      <MyPageBackHeader title="1:1 문의" />

      <section className="mt-[50px] flex w-[640px] flex-col gap-[20px]">
        <button
          type="button"
          disabled={!contact?.kakaoChannelUrl}
          onClick={handleKakaoClick}
          className="flex h-[60px] w-full items-center justify-center rounded-[5px] bg-[#1F212A] p-[10px] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#FAFAFA] transition-colors hover:bg-[#42444C]"
        >
          카카오톡 문의하기
        </button>

        <button
          type="button"
          disabled={!contact?.email}
          onClick={handleEmailClick}
          className="flex h-[60px] w-full items-center justify-center rounded-[5px] bg-[#1F212A] p-[10px] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#FAFAFA] transition-colors hover:bg-[#42444C]"
        >
          이메일 문의하기
        </button>
      </section>
    </main>
  );
};

export default MyPageInquiryPage;