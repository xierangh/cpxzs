/**
 *  css styles
 *
 */

'use strict';

var React = require('react-native');

var {
	StyleSheet,
	PixelRatio
} = React;

var pxielRatio = PixelRatio.get();
var SPR = 2;//原来的屏幕是苹果
var scale = SPR/pxielRatio;//缩放比例
if(pxielRatio >= 2){
	scale = 1;
}

let FONT_BIG_PLUS = 24*scale;
let FONT_BIG = 18*scale;
let FONT_BIG_SUB = 16*scale;
let FONT_NORMAL = 14*scale;
let FONT_SMALL = 12*scale;
let FONT_SMALL_S = 11*scale;


let underlayColor = '#fff3';
let title_color = '#fff';
let title_color_bg = 'rgba(234, 86, 86,1.0)';
//表格背景，表头背景，行背景
let TABLE_BACK_COLOR = '#0000';
let TABLE_TEXT_COLOR = '#333';
let TABLE_HDTEXT_COLOR = '#0006';
let TABLE_HEADER_LINE_COLOR = '#0001';

let TABLE_MARGIN_LEFT = 5;

//灰色
let TEXT_COLOR_BLACK = '#333'
//深灰
let TEXT_COLOR_DARK_GRAY = '#ffffff'

//分割线
let SPLIT_LINE = '#e5e5e5';
let FirstPageCircleSize = 36*scale;

var stylecpxzs = StyleSheet.create({
    selectedTitleStyle:{
		color:'#ea5656',
	},
	//页面切换背景颜色
	wrapperStyle:{
		backgroundColor:title_color_bg,
	},
	tab_bar_icon:{
		width:24,
		height:24,
	},
	//分割线-view
	splitLine_l_black: {
		height: .3*scale,
		backgroundColor: '#ccc',
	},
	splitLine_l: {
		height: .5*2/pxielRatio,
		backgroundColor: SPLIT_LINE,
	},
	splitLine: {
		height: 1*scale,
		backgroundColor: SPLIT_LINE,
	},
	splitLine_w: {
		height: 3*scale,
		backgroundColor: '#eee',
	},
	splitLine_ww: {
		height: 3*scale,
		backgroundColor: '#EEE6',
	},
	//按钮
	image:{
		width:30*scale,
		height:30*scale,
	},
	style_view_commit:{
	    justifyContent: 'center',
	    alignItems: 'center',
			marginRight:20*scale,
			height:60*scale,
			width:60*scale,
	  },
	//首页start
	firstPage_title_container:{
		height:63,
		flexDirection:'row',
		marginTop:0,
		justifyContent:'space-around',
		alignItems:'stretch',
		backgroundColor:title_color_bg,
	},
	//标题
	firstPage_title_center:{
		fontSize:FONT_BIG,
		color:title_color,
		textAlign: 'center',
		marginTop:25,
		flex:3,
		backgroundColor:'#f0f0',
		marginBottom:5*scale,
		alignSelf:'center',
	},
	firstPage_title_left:{
		fontSize:FONT_BIG,
		color:title_color,
		textAlign: 'center',
		marginTop:25,
		flex:3,
		backgroundColor:'#f0f0',
		marginBottom:5,
		marginLeft:100,
		alignSelf:'center',
	},
	firstPage_title_right:{
		fontSize:FONT_BIG_SUB,
		color:title_color,
		textAlign:'right',
	},
	firstPage_title_right_tl:{
		marginRight:20,
		marginTop:25,
		backgroundColor:'#0f00',
		width:80,
		alignSelf:'center',
	},
	//开奖
	firstPage_kaijiang:{
		flexDirection:'row',
		padding:5,
	},
	firstPage_kaijiang_icon_view:{
		width:100*scale,
		height:100*scale,
		borderRadius: 6,
		backgroundColor:'rgb(239,116,119)',
		alignItems:'center',
	},
	firstPage_kaijiang_icon:{
		resizeMode:'contain',
		width:100*scale,
		height:100*scale,
	},
	firstPage_kaijiang_right:{
		flex:1,
		flexDirection:'column',
		paddingLeft:10,
	},
	firstPage_kaijiang_right_1:{
		flexDirection:'row',
		paddingBottom:3,
	},
	firstPage_kaijiang_right_1_left:{
		color:title_color_bg,
		textAlign:'left',
		fontSize:FONT_SMALL,
	},
	firstPage_kaijiang_right_1_right:{
		color:TEXT_COLOR_BLACK,
		textAlign:'right',
		flex:5,
		marginRight:5,
		fontSize:FONT_SMALL,
	},
	firstPage_kaijiang_right_2:{
		justifyContent:'space-around',
		flexDirection:'row',
		marginVertical:5,
	},
	firstPage_kaijiang_circle:{
		width:FirstPageCircleSize,
		height:FirstPageCircleSize,
		borderRadius:FirstPageCircleSize/2,
		backgroundColor:title_color_bg,
		alignItems:'center',
		justifyContent:'center',
		margin:5,
	},
	firstPage_kaijiang_circle_number:{
		fontSize:FONT_BIG_PLUS,
		color:'#fff',
		textAlign:'center',
	},
	firstPage_kaijiang_right_3:{
		flexDirection:'row',
		paddingTop:5,
		alignItems:'stretch',
	},
	firstPage_kaijiang_right_3_left:{
		color:TEXT_COLOR_BLACK,
		textAlign:'left',
		fontSize:FONT_SMALL,
	},
	firstPage_kaijiang_right_3_right:{
		color:TEXT_COLOR_BLACK,
		textAlign:'right',
		fontSize:FONT_SMALL,
		alignSelf:'center',
		flex:1,
	},
	firstPage_kaijiang_right_3_right_time:{
		color:title_color_bg,
		textAlign:'right',
		fontSize:FONT_SMALL,
		fontWeight:'bold',
		alignSelf:'center',
		marginRight:5,
		width:65*scale,
	},
	//计划
	customStyle:{
	},
	firstPage_planRow:{
		flexDirection:'row',
		marginBottom:15,
		marginLeft:10,
		marginRight:10,
		justifyContent:'space-between',
	},
	//历史
	firstPage_history:{
		flexDirection:'row',
		padding:8,
	},
	firstPage_history_start:{
		backgroundColor:title_color_bg,
		width:4*scale,
		marginLeft:5,
		paddingVertical:2,
	},
	firstPage_history_left:{
		flex:1,
		fontSize:FONT_NORMAL,
		textAlign:'left',
		marginLeft:5,
	},
	firstPage_history_right:{
		flex:1,
		fontSize:FONT_NORMAL,
		color:title_color_bg,
		textAlign:'right',
		marginRight:10,
	},
	firstPage_history_item_zusan:{
		color:'#f7af36',
	},
	firstPage_history_item_zuliu:{
		color:'#0a9c48',
	},
	firstPage_history_item_baozi:{
		color:'#ea5656',
	},
	//histroy table
	headermgr: {
	 },
	tableHeader: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingVertical: 6,
	},
	headerFont: {
		fontWeight: 'bold',
		color:TABLE_TEXT_COLOR,
	},
	textcolorFont: {
		color:TABLE_TEXT_COLOR,

	},
	headerNumber: {
		textAlign: 'right',
		color: TABLE_TEXT_COLOR,
		marginRight: 20,
		alignSelf: 'center',
	},
	rowStyle: {
		flexDirection: 'row',
		paddingVertical: 8*scale,
		paddingLeft:0,
		paddingRight:0,
		flexWrap: 'wrap',
		alignItems: 'stretch',
	},
	noAlarm: {
		flex: 1, //weight
		textAlign: 'center',
		color: TABLE_TEXT_COLOR,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	nodata:{
		flex: 1, //weight
		height:100,
		textAlign: 'center',
		color: TABLE_TEXT_COLOR,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	history: {
		width:120,
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		marginLeft: 20,
		marginRight:10,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	history_center: {
		flex: 1, //weight
		textAlign: 'left', //位置
		color: TABLE_TEXT_COLOR,
		fontSize: FONT_SMALL,
	},
	history_end: {
		width:40*scale,
		marginRight:10,
		textAlign: 'left', //位置
		color: TABLE_TEXT_COLOR,
		fontSize: FONT_SMALL,
	},
	history_center_w: {
		flex: 1.5, //weight
		textAlign: 'left', //位置
		color: title_color_bg,
		fontSize: FONT_SMALL,
	},
	history_center_row:{
		flex: 1, //weight
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	history_center_row_w:{
		flex: 2, //weight
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	histroy_item: {
		flex:1,
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		marginLeft: 20,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	rowNumber: {
		marginRight: 10,
		fontSize:12,
		color:TABLE_TEXT_COLOR,
	},

	//首页end
	//登录输入，和按钮 start
	style_input_label: {
		marginLeft: 20,
		marginRight: 20,
		textAlign:'center',
		fontSize:FONT_NORMAL*scale,
		color:'#929292',
	},
	style_input: {
		marginLeft: 20,
		marginRight: 20,
		paddingLeft:10,
		paddingRight:10,
		height: 40*scale,
		fontSize:FONT_NORMAL*scale,
		color:'#929292',
		flex: 1,
		alignSelf:'center',
	},
	style_inputmbg:{
		marginBottom:15,
	},
	style_placeholder:{
		color:'#929292',
	},
	//登录输入，和按钮 end
	//usercenter
	usercenter_circle:{
		width:24,
		height:24,
		borderRadius:24/2,
		backgroundColor:'#f00',
		alignItems:'center',
		justifyContent:'center',
		margin:5,
	},
	//usercenter
	//common start
	view_container:{
		height:270,
		alignItems:'stretch',
		justifyContent:'space-around',
		backgroundColor:'#fff0',
		marginTop:-10,
	},
	container: {
		flex: 1,
		marginTop: 0,
		backgroundColor: '#fff',
	},
	container_tab: {
		flex: 1,
		marginTop: 0,
		marginBottom:48,
		backgroundColor: '#fff',
	},

	container_nav: {
		flex: 1,
		marginTop: 25,
		backgroundColor: '#fff',
	},
	navigator_container: {
		flex: 1,
		marginTop: 65,
		backgroundColor:'#0000',
	},
	title: {
		alignSelf: 'center',
		paddingVertical: 5,
		fontSize: FONT_BIG,

	},
	text: {
		alignSelf: 'flex-start',
		paddingVertical: 5,
		marginLeft: 10,
		color: TABLE_TEXT_COLOR,
		fontSize: FONT_NORMAL,
	},
	underline: {
		textDecorationLine: 'underline',
		color: '#447edb',
	},
	titleContainer:{
		flexDirection: 'row',
		marginTop:25,
	},
	titleContainer_title:{

		flex:1,
		alignSelf:'center',
		fontWeight: 'bold',
		fontSize:20,
		textAlign:'center',
		marginLeft:50,
		color:'#ffffff',
	},
	titleContainer_img:{
		marginRight:20,
	},
	//common end

	//tab start
	tabContent: {
		flex: 1,
		alignItems: 'center',
	},
	tabText: {
		color: 'white',
		margin: 50,
	},
	//tab end

	//jingpinplan
	jpp_hide_view:{
		backgroundColor:'#EEE',
		flexDirection:'row',
		justifyContent:'space-around',
	},
	jpp_hide_view_btn:{
    	marginVertical:5,
		padding:5,
		justifyContent:'center',
		alignItems:'center',
	},
    jpp_hide_view_btn_selected:{
		borderWidth:1,
		borderColor:'#ea5656',
		borderRadius:5,
    },
    jpp_hide_view_btn_text:{
		color:'#ea5656'
	},
	jpp_hide_view_fn:{
		backgroundColor:'#EEE',
		flexDirection:'row',
		paddingVertical:10,
		justifyContent:'space-around',
		alignItems:'center',

	},
	picker_view:{
		backgroundColor:'#fff',
		width:64*scale,
		alignSelf:'center',
        marginRight:8,
        borderRadius:12,
        borderWidth:1,
        borderColor:'#ea5656'
	},
	picker:{
        width:150,
		height:30
	},

	//table
	plan_center: {
		flex: 1, //weight
		textAlign: 'left', //位置
		fontSize:FONT_SMALL,
	},
	plan_center_w: {
		flex: 2, //weight
		textAlign: 'left', //位置
		fontSize:FONT_SMALL,
	},
	plan_center_row:{
		flex: 1, //weight
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	plan_center_row_w:{
		flex: 2, //weight
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	plan_item: {
		flex:2,
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		marginLeft: 20,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	plan_item_desc: {
		flex:2,
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		marginLeft: 20,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	plan_center_row_w_desc:{
		flex: 4, //weight
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	plan_center_desc:{
		flex: 1, //weight
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},

	btjs_rowStyle: {
		flexDirection: 'row',
		paddingVertical: 5,
		paddingLeft:0,
		paddingRight:0,
		flexWrap: 'wrap',
		alignItems: 'stretch',
	},
	btjs_plan_center_row_w:{
		flex: 2, //weight
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		marginLeft:20,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	btjs_plan_center_row_ww:{
		flex: 2, //weight
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		marginLeft:10,
		alignSelf: 'center', //位置
		fontSize: FONT_SMALL,
	},
	btjs_plan_item: {
		flex:1,
		textAlign: 'left',
		color: TABLE_TEXT_COLOR,
		marginLeft: 20,
		fontSize: FONT_SMALL,
	},

	//jingpinplan end
	//做号工具
	notool_title:{
		fontSize:FONT_BIG,
		color:title_color,
		textAlign: 'center',
		marginTop:25,
		flex:1,
		backgroundColor:'#f0f0',
		marginBottom:5,
		fontWeight:'bold',
		alignSelf:'center',
	},
	notool_btn_view:{
		flexDirection:'row',
		padding:5,
		backgroundColor:'rgb(246,246,246)',
		justifyContent:'space-around',
		alignItems:'center',
	},
	notool_sub_title:{
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'rgb(246,246,246)'
	},
	notool_sub_title_start:{
		backgroundColor:title_color_bg,
		width:3*scale,
		marginLeft:5,
		height:15*scale,
	},
	notool_sub_title_left:{
		flex:1,
		fontSize:FONT_NORMAL,
		textAlign:'left',
		marginLeft:5,
		color:'#333',
	},
	notool_sub_title_center:{
		width:30,
		fontSize:FONT_SMALL,
		color:'#000',
		textAlign:'center',
	},
	notool_sub_title_right:{
		width:30*scale,
		paddingVertical:10,
		marginLeft:10,
		marginRight:10,
	},
	notool_sub_title_right_text:{
		fontSize:FONT_NORMAL,
		color:title_color_bg,
		textAlign:'center',
	},
	notool_text_left:{
		marginTop:12,
		marginLeft:10,
		fontSize:FONT_SMALL,
	},
	notool_text_left_yilou:{
		marginTop:7,
		marginLeft:10,
		fontSize:FONT_SMALL,
	},
	notool_row:{
		flexDirection:'row',
	},

	notool_btn:{
		flex:1,
		width:68*scale,
		height:30*scale,
		borderRadius:4,
		borderColor:'rgb(255,131,33)',
		borderWidth:1,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'rgb(255,131,33)',
		margin:3,
	},
	notool_btn_text:{
		fontSize:14*scale,
		color:'#fff',
		textAlign:'center',
	},
	notool_result_number:{
		marginLeft:10,
	},
	notool_result_text:{
		marginLeft:10,
		marginRight:10,
		padding:3,
		fontSize:10,
		borderColor:'#eee',
		borderWidth:2,
		borderRadius:4,
		flex:1,
		marginVertical:5,
		// height:1000,
	},
});
var notool_circle_size=20;

module.exports = stylecpxzs;
