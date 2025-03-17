import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

export default function WalkThroughTooltipComponent() {
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const tooltipRef = useRef(null);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Tooltip
        ref={tooltipRef}
        isVisible={tooltipVisible}
        content={<Text>This is a tooltip!</Text>}
        placement="top"
        onClose={() => setTooltipVisible(true)}
      >
        <TouchableOpacity onPress={() => setTooltipVisible(false)}>
          <Text>Show Tooltip</Text>
        </TouchableOpacity>
      </Tooltip>
    </View>
  );
}