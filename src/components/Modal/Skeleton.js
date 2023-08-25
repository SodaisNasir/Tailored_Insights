import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../utils/Colors';

const Skeleton = ({ChangeBorderRadius}) => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      borderRadius={ChangeBorderRadius ? scale(350) :  scale(20)}
      highlightColor={Colors.Main}
      backgroundColor={Colors.Ash}>
      <SkeletonPlaceholder.Item marginTop={verticalScale(15)} flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item
          width={scale(130)}
          height={scale(130)}
          marginLeft={scale(8)}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default Skeleton;
