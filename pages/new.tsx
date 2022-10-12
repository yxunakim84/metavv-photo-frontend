import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/Layout";
import styles from "../styles/New.module.scss";

const Footer = ({ n }: { n: number }) => {
  const router = useRouter();
  return (
    <div className={styles.footer}>
      <button className={styles.button} onClick={() => router.back()}>
        이전
      </button>
      <div>총 {n}장의 사진을 등록했어요!</div>
      <button className={styles.button} disabled={n < 2}>
        완료
      </button>
    </div>
  );
};

const UploadButton = ({ handleFileUpload }: { handleFileUpload: Function }) => (
  <label className={styles.upload_button}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9 17.75C8.30964 17.75 7.75 17.1904 7.75 16.5V10.25H1.5C0.809644 10.25 0.25 9.69036 0.25 9C0.25 8.30964 0.809644 7.75 1.5 7.75H7.75V1.5C7.75 0.809644 8.30964 0.25 9 0.25C9.69036 0.25 10.25 0.809644 10.25 1.5V7.75H16.5C17.1904 7.75 17.75 8.30964 17.75 9C17.75 9.69036 17.1904 10.25 16.5 10.25H10.25V16.5C10.25 17.1904 9.69036 17.75 9 17.75Z"
        fill="white"
      />
    </svg>
    <input
      className={styles.input}
      type="file"
      onChange={(e) => {
        if (e.target.files) handleFileUpload(e.target.files[0]);
      }}
    />
  </label>
);

const Home: NextPage = () => {
  const [images, setImages] = useState([] as File[]);

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const f = file; // 여기에 파일 업로드 입력
    setImages((images) => [...images, f]);
  };

  return (
    <Layout footer={<Footer n={images.length} />}>
      <div className={styles.main}>
        <div className={styles.title}>사진을 등록해주세요!</div>
        <ul className={styles.contents}>
          <li>사진은 최소 2장 ~ 최대 16장까지 선택할 수 있어요.</li>
          <li>선택한 사진이 홀수인 경우 1장은 부전승 처리됩니다.</li>
          <li>각 사진의 대진은 무작위로 진행됩니다.</li>
        </ul>
        <div className={styles.images}>
          {images.length === 0 && (
            <UploadButton handleFileUpload={handleFileUpload} />
          )}
          {images.map((image) => (
            <div key={image.name} className={styles.uploaded}>
              {/* key를 image.name으로 하면 안된다 (겹칠 수 있어서... 나중에 id 같은 걸로 바꿔줘야 함.) */}
              <img src="https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg" />
              <button
                className={styles.close}
                onClick={() => {
                  setImages(
                    (images) => images.filter((i) => i.name !== image.name) // 마찬가지
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <path
                    d="M3.99995 4.52501L1.46245 7.06251C1.39578 7.12918 1.31045 7.16451 1.20645 7.16851C1.10212 7.17285 1.01245 7.13751 0.937451 7.06251C0.862451 6.98751 0.824951 6.90001 0.824951 6.80001C0.824951 6.70001 0.862451 6.61251 0.937451 6.53751L3.47495 4.00001L0.937451 1.46251C0.870784 1.39585 0.835451 1.31035 0.831451 1.20601C0.827118 1.10201 0.862451 1.01251 0.937451 0.937512C1.01245 0.862512 1.09995 0.825012 1.19995 0.825012C1.29995 0.825012 1.38745 0.862512 1.46245 0.937512L3.99995 3.47501L6.53745 0.937512C6.60412 0.870845 6.68962 0.835346 6.79395 0.831012C6.89795 0.827012 6.98745 0.862512 7.06245 0.937512C7.13745 1.01251 7.17495 1.10001 7.17495 1.20001C7.17495 1.30001 7.13745 1.38751 7.06245 1.46251L4.52495 4.00001L7.06245 6.53751C7.12912 6.60418 7.16445 6.68951 7.16845 6.79351C7.17278 6.89785 7.13745 6.98751 7.06245 7.06251C6.98745 7.13751 6.89995 7.17501 6.79995 7.17501C6.69995 7.17501 6.61245 7.13751 6.53745 7.06251L3.99995 4.52501Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          ))}
          <UploadButton handleFileUpload={handleFileUpload} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;