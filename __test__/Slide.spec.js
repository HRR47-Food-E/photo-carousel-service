import React from 'react';

import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Slide from '../client/components/slide.jsx';

configure({ adapter: new Adapter() });

//   const carouselProps = {
//   photoArray: [{}],
//   displayCarousel: true,
//   startingPhoto: 0,
//   closeCarousel: () => {},
//   closeSymbol: '&#x2715',
// };

describe('Slide', () => {
  it('should contain an img tag', () => {
    const slideProps = {
      url: 'https://tagaz.s3-us-west-1.amazonaws.com/img0042.jpeg',
    };
    const slide = mount(<Slide {...slideProps}/>);
    expect(slide.find('img').length).toBe(1);
  });
});
