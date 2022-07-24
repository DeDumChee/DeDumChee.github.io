var parser = new DOMParser();

var robinXML = `
<dir name="Robin">
    <downIdle x="22" y="145" w="14" h="28"/>
    <downWalkLeft x="39" y="146" w="13" h="27"/>
    <downWalkRight x="71" y="146" w="13" h="27"/>
    <rightIdle x="21" y="178" w="15" h="27"/>
    <rightWalkRight x="37" y="179" w="15" h="26"/>
    <rightWalkLeft x="69" y="179" w="15" h="26"/>
    <upIdle x="22" y="209" w="14" h="28"/>
    <upWalkRight x="39" y="210" w="12" h="27"/>
    <upWalkLeft x="71" y="210" w="12" h="27"/>
    <leftIdle x="22" y="242" w="15" h="27"/>
    <leftWalkRight x="38" y="243" w="15" h="26"/>
    <leftWalkLeft x="70" y="243" w="15" h="26"/>
    <coffee1 x="23" y="273" w="13" h="28"/>
    <coffee2 x="39" y="273" w="13" h="28"/>
    <coffee3 x="55" y="272" w="13" h="29"/>
    <hammerIdle1 x="70" y="339" w="15" h="26"/>
    <hammerIdle2 x="70" y="307" w="15" h="26"/>
    <hammer1 x="53" y="338" w="16" h="27"/>
    <hammer2 x="38" y="338" w="15" h="27"/>
    <hammer3 x="22" y="338" w="15" h="27"/>
    <scream x="70" y="274" w="14" h="27"/>
    <yawn x="23" y="400" w="13" h="29"/>
    <pout x="55" y="401" w="13" h="28"/>
</dir>
`