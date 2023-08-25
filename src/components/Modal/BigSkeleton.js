import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../utils/Colors';

const BigSkeleton = () => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      borderRadius={scale(20)}
      highlightColor={Colors.Main}
      backgroundColor={Colors.Ash}>
      <SkeletonPlaceholder.Item marginTop={verticalScale(15)}>
        <SkeletonPlaceholder.Item
          marginLeft="4%"
          width="92%"
          height={verticalScale(250)}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default BigSkeleton;
