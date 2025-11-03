import VideosSection from "../sections/videos-section";

const StudioView = () => {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <div className="px-4">
        <h1 className="text-2xl font-bold">채널 콘텐츠</h1>
        <p className="text-xs text-muted-foreground">
          동영상을 관리하고 분석합니다.
        </p>
      </div>
      <VideosSection />
    </div>
  );
};

export default StudioView;
