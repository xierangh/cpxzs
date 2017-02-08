var paramjson ={
                               zhgjType:'twoStar',
                               //胆码，跨度，尾和，和值
                               danMaNum:this.arrayToStr(this.refs.dm.getSelected()),
                               danMaKeepOrDel:keep,
                               spanNum:this.arrayToStr(this.refs.kuadu.getSelected()),
                               spanKeepOrDel:keep,
                               endValueNum:this.arrayToStr(this.refs.hewei.getSelected()),
                               endValueKeepOrDel:keep,
                               sumValueNum:this.arrayToStr(this.refs.hezhi.getSelected()),
                               sumValueKeepOrDel:keep,
                               //个十百千万
                               firstNum:this.arrayToStr(this.refs.sdw5.getSelected()),
                               firstNumKeepOrDel:keep,
                               secondNum:this.arrayToStr(this.refs.sdw4.getSelected()),
                               secondNumKeepOrDel:keep,
                               thirdNum:this.arrayToStr(this.refs.sdw3.getSelected()),
                               thirdNumKeepOrDel:keep,
                               fourthNum:this.arrayToStr(this.refs.sdw2.getSelected()),
                               fourthNumKeepOrDel:keep,
                               fifthNum:this.arrayToStr(this.refs.sdw1.getSelected()),
                               fifthNumKeepOrDel:keep,
                               //大小／奇偶／质合
                               bigSmallNum:this.arrayToStr(this.refs.sspecial.getSelected()),
                               bigSmallKeepOrDel:remove,
                               evenOddNum:this.arrayToStr(this.refs.sspecial.getSelected()),
                               evenOddKeepOrDel:remove,
                               primeCompositeNum:this.arrayToStr(this.refs.sspecial.getSelected()),
                               primeCompositeKeepOrDel:remove,
                               //012
                               approachNum:this.arrayToStr(this.refs.s012.getSelected()),
                               approachKeepOrDel:remove,

                              //  bigSmallPercent:,
                              //  bigSmallPercentKeepOrDel:keep,
                              //  oddEvenPercent:,
                              //  oddEvenPercentKeepOrDel:keep,
                              //  primeCompositePercent:,
                              //  primeCompositePercentKeepOrDel:keep,
                              //  shangShan:,
                              //  shangShanKeepOrDel:remove,
                              //  xiaShan:,
                              //  xiaShanKeepOrDel:remove,
                              //  consecutive:,
                              //  abcde:,
                              //  abcdeKeepOrDel:remove,
                              //  minNum:,
                              //  minNumKeepOrDel:keep,
                              //  maxNum:,
                              //  maxNumKeepOrDel:keep,
                              //  acValue:,
                              //  acValueKeepOrDel:remove,
                              //  convex:,
                              //  convexKeepOrDel:remove,
                              //  sunken:,
                              //  sunkenKeepOrDel:remove,
                              //  nPattern:,
                              //  nPatternKeepOrDel:remove,
                              //  notNPattern:,
                              //  notNPatternKeepOrDel:remove,
                              //  removeBaozi:,
                              //  removeSanHao:,
                              //  removeDuizi:,
                              //  removeSanTonghao:,
                              //  removeTwoDuizi:,
                              //  removeGroupThree:,
                              //  removeGroupSix:,
                              //  bigNum:,
                              //  bigNumKeepOrDel:keep,
                              //  primeNum:,
                              //  primeNumKeepOrDel:keep,
                              //  oddNum:,
                              //  oddNumKeepOrDel:keep,
                              //  chuDanNumKeepOrDel:keep,
                               chuDanNum:1,
                              //  danZuNum:,
                              //  danZuNumCount:,
                              //  groupBasicNum:,
                              //  groupNumType:,
                               zuXuanType:'zuXuan120',
                              //  specilFirstNum:,
                              //  specilSecondNum:,
};

<ScrollView
    style={{flex:1,marginTop:0}}
    automaticallyAdjustContentInsets={false}
    >
    <View style={styles.splitLine}></View>
    <View style={styles.notool_sub_title}>
      <View style={styles.notool_sub_title_start}></View>
      <Text style={styles.notool_sub_title_left}>胆码</Text>
      <TouchableHighlight
        onPress={()=>this.setDmValue([5,6,7,8,9])}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_center}>大</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>this.setDmValue([0,1,2,3,4])}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_center}>小</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>this.setDmValue([1,3,5,7,9])}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_center}>单</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>this.setDmValue([0,2,4,6,8])}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_center}>双</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>this.setDmValue([5,6,7,8,9])}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_center}>012</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={()=>this.clearSelect('sdm')}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_right}>清除</Text>
      </TouchableHighlight>
    </View>
    <View style={{flexDirection:'row'}}>
        <Text style={styles.notool_text_left}>胆码:</Text>
        <NotoolRowView
          ref={'dm'}
          selected={[3,5,7]}
          />
    </View>

    <View style={styles.splitLine}></View>
    <View style={styles.notool_sub_title}>
      <View style={styles.notool_sub_title_start}></View>
      <Text style={styles.notool_sub_title_left}>杀历史开奖号</Text>
    </View>
    <View style={{flexDirection:'row',padding:10}}>
      <Text>杀前</Text>
      <TextInput style={{color:'#000',borderWidth:1,borderColor:'#f00',width:50,fontSize:14}}
          autoCorrect={false}
          onChangeText={(text) => this.setState({kill_period_number:text})}
          value={this.state.kill_period_number}
          keyboardType='numeric'
          placeholderTextColor='#929292'></TextInput>
      <Text>期开奖号</Text>
      <Text style={{color:'#666'}}>(注:期数可以手动输入)</Text>
    </View>

    <View style={styles.splitLine}></View>
    <View style={styles.notool_sub_title}>
      <View style={styles.notool_sub_title_start}></View>
      <Text style={styles.notool_sub_title_left}>杀定位</Text>
      <TouchableHighlight
        onPress={()=>this.clearSelect('sdw')}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_right}>清除</Text>
      </TouchableHighlight>
    </View>

    {this.state.zhgjType >4 &&
      <View>
      <View style={{flexDirection:'row'}}>
          <Text style={styles.notool_text_left}>万位</Text>
          <NotoolRowView
            ref='sdw1'
            />
      </View>

      <View style={{flexDirection:'row'}}>
          <Text style={styles.notool_text_left}>遗漏</Text>
          <NotoolRowYiLouView
            selected={[10,23,34,8,4,6,18,34,21,12]}
            />
      </View>
    </View>
  }
    {this.state.zhgjType >3 &&
      <View>
      <View style={{flexDirection:'row'}}>
          <Text style={styles.notool_text_left}>千位</Text>
          <NotoolRowView
            ref='sdw2'
            />
      </View>


      <View style={{flexDirection:'row'}}>
          <Text style={styles.notool_text_left}>遗漏</Text>
          <NotoolRowYiLouView
            selected={[10,23,34,8,4,6,18,34,21,12]}
            />
      </View>
    </View>
  }
  {this.state.zhgjType >2 &&
    <View>
      <View style={{flexDirection:'row'}}>
          <Text style={styles.notool_text_left}>百位</Text>
          <NotoolRowView
            ref='sdw3'
            />
      </View>
      <View style={{flexDirection:'row'}}>
          <Text style={styles.notool_text_left}>遗漏</Text>
          <NotoolRowYiLouView
            selected={[10,23,34,8,4,6,18,34,21,12]}
            />
      </View>
    </View>
  }

    <View style={{flexDirection:'row'}}>
        <Text style={styles.notool_text_left}>十位</Text>
        <NotoolRowView
          ref='sdw4'
          />
    </View>
    <View style={{flexDirection:'row'}}>
        <Text style={styles.notool_text_left}>遗漏</Text>
        <NotoolRowYiLouView
          selected={[10,23,34,8,4,6,18,34,21,12]}
          />
    </View>

    <View style={{flexDirection:'row'}}>
        <Text style={styles.notool_text_left}>个位</Text>
        <NotoolRowView
          ref='sdw5'
          />
    </View>
    <View style={{flexDirection:'row'}}>
        <Text style={styles.notool_text_left}>遗漏</Text>
        <NotoolRowYiLouView
          selected={[10,23,34,8,4,6,18,34,21,12]}
          />
    </View>

    <View style={styles.splitLine}></View>
    <View style={styles.notool_sub_title}>
      <View style={styles.notool_sub_title_start}></View>
      <Text style={styles.notool_sub_title_left}>杀和尾/跨度/和值</Text>
      <TouchableHighlight
        onPress={()=>this.clearSelect('shkh')}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_right}>清除</Text>
      </TouchableHighlight>
    </View>
    <View style={{flexDirection:'row'}}>
        <Text style={styles.notool_text_left}>和尾</Text>
        <NotoolRowView
          ref={'hewei'}
          />
    </View>
    <View style={{flexDirection:'row'}}>
        <Text style={styles.notool_text_left}>跨度</Text>
        <NotoolRowView
          ref={'kuadu'}
          />
    </View>
    <View style={{flexDirection:'row'}}>
        <Text style={styles.notool_text_left}>和值</Text>
        <NotoolRowView
          ref={'hezhi'}
          maxNum={this.state.maxNum}
          />
    </View>

    {this.state.zhgjType > 2 &&
      <View>
        <View style={styles.splitLine}></View>
        <View style={styles.notool_sub_title}>
          <View style={styles.notool_sub_title_start}></View>
          <Text style={styles.notool_sub_title_left}>杀特殊形态</Text>
          <TouchableHighlight
            onPress={()=>this.clearSelect('sspecial')}
            underlayColor={'#ffffff20'}
            >
            <Text style={styles.notool_sub_title_right}>清除</Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',marginLeft:10}}>
            <NotoolRowText2ViewOld
              ref='sspecial'
              items={this.state.itemspecial}
              />
        </View>
    </View>
   }

    <View style={styles.splitLine}></View>
    <View style={styles.notool_sub_title}>
      <View style={styles.notool_sub_title_start}></View>
      <Text style={styles.notool_sub_title_left}>杀012路</Text>
      <TouchableHighlight
        onPress={()=>this.clearSelect('s012')}
        underlayColor={'#ffffff20'}
        >
          <Text style={styles.notool_sub_title_right}>清除</Text>
      </TouchableHighlight>
    </View>
    <View style={{flexDirection:'row',marginLeft:10}}>
        <NotoolRowText2View
          ref='s012'
          starNum={3}
          isS012={true}
          />
    </View>

    <View style={styles.splitLine}></View>
    <View style={styles.notool_sub_title}>
      <View style={styles.notool_sub_title_start}></View>
      <Text style={styles.notool_sub_title_left}>杀大小/单双/质合</Text>
      <TouchableHighlight
        onPress={()=>this.clearSelect('sddz')}
        underlayColor={'#ffffff20'}
        >
        <Text style={styles.notool_sub_title_right}>清除</Text>
      </TouchableHighlight>
    </View>
    <View style={{flexDirection:'row',marginLeft:10}}>
        <NotoolRowText2View
          ref='sddz'
          starNum={3}
          />
    </View>

    <View style={styles.splitLine}></View>
    <View style={styles.notool_sub_title}>
      <TouchableHighlight
        underlayColor={'#f00'}
        onPress={()=>this.createNo()}
        >
        <View style={styles.notool_btn}>
          <Text style={styles.notool_btn_text}>生成号码</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>this.turnZuxuan()}
        underlayColor={'#ffffff20'}
        >
        <View style={styles.notool_btn}>
          <Text style={styles.notool_btn_text}>转为组选</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>this.reverse()}
        underlayColor={'#ffffff20'}
        >
        <View style={styles.notool_btn}>
        <Text style={styles.notool_btn_text}>立即反选</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>this.copyno()}
        underlayColor={'#ffffff20'}
        >
        <View style={styles.notool_btn}>
        <Text style={styles.notool_btn_text}>复制号码</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>this.clearSelect('all')}
        underlayColor={'#ffffff20'}
        >
        <View style={styles.notool_btn}>
        <Text style={styles.notool_btn_text}>全部清空</Text>
        </View>
      </TouchableHighlight>
    </View>

    <Text>共:{this.state.resultSet.length}注</Text>
    <Text
      ref='resultSet'
      style={{borderColor:'#eee',borderWidth:1,borderRadius:4,flex:1,height:150,margin:5}}>
        {this.state.resultSet.join(' ')}
    </Text>
</ScrollView>
