import React from "react";
import { RDSCard, RDSCarousel, RDSPagination } from "@reconlabs/reconlabs-fe-components-stag";

type Props = {};

const Carousel = (props: Props) => {
  return (
    <RDSCarousel>
      <RDSCard.Thumbnail title="Example1" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example2" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example3" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example4" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example5" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example6" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example7" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example8" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example9" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
      <RDSCard.Thumbnail title="Example10" supportingText="example example example" enableSwitch={false} handleClick={() => window.open("http://www.naver.com")} />
    </RDSCarousel>
  );
};

export default React.memo(Carousel);
