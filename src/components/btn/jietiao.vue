<template>
    <div id="jiediaoapp">
      <el-button type="text" @click="dialogVisible = true" style="display:block;margin: 20px auto"  v-if="haveJT === 2 || haveJT === ''">获取用户各平台借条</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body='false'
        :before-close="handleClose">
        <span>仅首次获取该用户借条记录需要支付5元，请确认（<span style="color: #ad0000">获取后请刷新页面</span>，再次选择该用户将自动展示借条记录）</span><br>
        <label for="pingtaixuanze">请选择平台：
          <select name="pingtai" id="pingtaixuanze">
            <option value="1">借贷宝</option>
            <option value="2">今借到</option>
            <option value="3">无忧借条</option>
            <option value="4">米房</option>
            <option value="5">友凭证</option>
          </select>
        </label>
        <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center">
            <el-button @click="dialogVisible = false" style="width: 80px">取 消</el-button>
             <el-button type="primary" @click="shujuqueren" style="width: 80px">确 定</el-button>
        </span>
      </el-dialog>
      <div id="ifblock">
        <span @click="closebox">关闭</span>
        <iframe :src=srcif frameborder="0" id="ifbox"></iframe>
      </div>
      <div v-if="haveJT===1">
        <div id="JTheader">
          <div id="yuan"><img src="../../assets/bsjt.png" alt=""></div>
          <div id="tiao"><p>借条平台授权*未注册平台可忽略</p></div>
        </div>
        <!--借贷宝-->
        <div id="jiedaobao" class="bankuai">
          <div class="bankuaitou">
            <h5>借贷宝</h5><h6 class="huoxinxi" @click="openbox" id="jdbpt">获取/更新用户信息</h6>
          </div>
          <div class="line"></div>
          <div class="bankuaibody">
            <p class="biaoname">基本信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">姓名</p>
                <p class="xinxineirong">{{myJTdata.name}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">电话</p>
                <p class="xinxineirong">{{myJTdata.photo}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">注册日期</p>
                <p class="xinxineirong">{{jdbData.register_time}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">好友数</p>
                <p class="xinxineirong">{{jdbData.hys}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借出金额</p>
                <p class="xinxineirong">{{jdbData.lend_amount}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借入金额</p>
                <p class="xinxineirong">{{jdbData.borrow_amount}}</p>
              </div>
            </div>
            <p class="biaoname">信用信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">信用等级</p>
                <p class="xinxineirong">{{jdbData.level}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">是否逾期</p>
                <p class="xinxineirong">{{jdbData.sfyq}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">逾期金额</p>
                <p class="xinxineirong">{{jdbData.jdyqje}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">逾期次数</p>
                <p class="xinxineirong">{{jdbData.jdyqcsz}}</p>
              </div>
            </div>
            <p class="biaoname">借款及逾期</p>
            <p class="linetext">30天以上逾期次数<span class="numbers">{{jdbData.jdyqsht}}</span></p>
            <p class="linetext">历史逾期金额<span class="numbers">{{jdbData.jdyqje}}</span></p>
            <p class="linetext">当前逾期金额<span class="numbers">{{jdbData.jdyqdqyq}}</span></p>
            <p class="linetext">最近一次逾期<span class="numbers">{{jdbData.jdyqsj}}</span></p>
            <p class="linetext">逾期最大天数<span class="numbers">{{jdbData.jdyqzdts}}</span></p>
            <p class="linetext">首次逾期<span class="numbers">{{jdbData.jdyqscsj}}</span></p>
            <p class="linetext">最近还款时间<span class="numbers">{{jdbData.payment_date}}</span></p>
            <p class="linetext">总还款次数<span class="numbers">{{jdbData.jdyqjrcs}}</span></p>
            <p class="linetext">正在进行的贷款笔数<span class="numbers">{{jdbData.jdyqjccs}}</span></p>
            <p class="linetext">现借入金额<span class="numbers">{{jdbData.borrow_amount}}</span></p>
            <p class="linetext">历史借款笔数<span class="numbers">{{jdbData.jdyqjrcs}}</span></p>
            <p class="linetext">账户余额<span class="numbers">{{jdbData.balance}}</span></p>
            <p class="biaoname">借贷流水</p>
            <div class="danyuanmen">
              <table>
                <tr>
                  <th>类型</th>
                  <th>金额</th>
                  <th>利息</th>
                  <th>流水状态</th>
                </tr>
                <tr v-for="(item,index,key) in myJTdatabill_list" :key="index">
                  <th>{{item.detail_type}}</th>
                  <th>{{item.amount}}</th>
                  <th>{{item.interest}}</th>
                  <th>{{item.has_overdued}}</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!--今借到-->
        <div id="jinjiedao" class="bankuai">
          <div class="bankuaitou">
            <h5>今借到</h5><h6 class="huoxinxi" @click="openbox" id="jjdpt">获取/更新用户信息</h6>
          </div>
          <div class="line"></div>
          <div class="bankuaibody">
            <p class="biaoname">基本信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">姓名</p>
                <p class="xinxineirong">{{myJTdata.name}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">电话</p>
                <p class="xinxineirong">{{myJTdata.photo}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">注册日期</p>
                <p class="xinxineirong">{{jjdData.register_time}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">学历</p>
                <p class="xinxineirong">{{jjdData.xuexin_status}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">信用等级</p>
                <p class="xinxineirong">{{jjdData.desc}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">好友数</p>
                <p class="xinxineirong">{{jjdData.jjd}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借出金额</p>
                <p class="xinxineirong">{{jjdData.lend_amount}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">{{jjdData.borrow_amount}}</p>
                <p class="xinxineirong">查查鸟</p>
              </div>
            </div>
            <p class="biaoname">信用信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">房产信息</p>
                <p class="xinxineirong">{{jjdData.fcrz}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">车产认证</p>
                <p class="xinxineirong">{{jjdData.ccrz}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">收入认证</p>
                <p class="xinxineirong">{{jjdData.srxxrz}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">银行卡认证</p>
                <p class="xinxineirong">{{jjdData.yhkrz}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">月收入</p>
                <p class="xinxineirong">{{jjdData.earn_month}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">工作单位</p>
                <p class="xinxineirong">{{jjdData.company_name}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">是否逾期</p>
                <p class="xinxineirong">{{jjdData.sfyq}}</p>
              </div>
            </div>
            <p class="biaoname">借款及逾期</p>
            <p class="linetext">30天以上逾期次数<span class="numbers">{{jjdData.jdyqsht}}</span></p>
            <p class="linetext">历史逾期金额<span class="numbers">{{jjdData.jdyqje}}</span></p>
            <p class="linetext">当前逾期金额<span class="numbers">{{jjdData.jdyqdqyq}}</span></p>
            <p class="linetext">最近一次逾期<span class="numbers">{{jjdData.jdyqsj}}</span></p>
            <p class="linetext">逾期最大天数<span class="numbers">{{jjdData.jdyqzdts}}</span></p>
            <p class="linetext">首次逾期<span class="numbers">{{jjdData.jdyqscsj}}</span></p>
            <p class="linetext">最近还款时间<span class="numbers">{{jjdData.payment_date}}</span></p>
            <p class="linetext">总还款次数<span class="numbers">{{jjdData.jdyqjrcs}}</span></p>
            <p class="linetext">正在进行的贷款笔数<span class="numbers">{{jjdData.jdyqjccs}}</span></p>
            <p class="linetext">现借入金额<span class="numbers">{{jjdData.borrow_amount}}</span></p>
            <p class="linetext">历史借款笔数<span class="numbers">{{jjdData.jdyqjrcs}}</span></p>
            <p class="linetext">账户余额<span class="numbers">{{jjdData.balance}}</span></p>
            <p class="biaoname">借贷流水</p>
            <div class="danyuanmen">
              <table>
                <tr>
                  <th>类型</th>
                  <th>金额</th>
                  <th>利息</th>
                  <th>流水状态</th>
                </tr>
                <tr v-for="(item,index,key) in myJTdatajjdData_bill_list" :key="index">
                  <th>{{item.detail_type}}</th>
                  <th>{{item.amount}}</th>
                  <th>{{item.interest}}</th>
                  <th>{{item.has_overdued}}</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!--友凭证-->
        <div id="youpinzheng" class="bankuai">
          <div class="bankuaitou">
            <h5>友凭证</h5><h6 class="huoxinxi" @click="openbox" id="ypzpt">获取/更新用户信息</h6>
          </div>
          <div class="line"></div>
          <div class="bankuaibody">
            <p class="biaoname">基本信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">姓名</p>
                <p class="xinxineirong">{{myJTdata.name}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">电话</p>
                <p class="xinxineirong">{{myJTdata.photo}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">平台昵称</p>
                <p class="xinxineirong">{{ypzData.nick_name}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">好友数</p>
                <p class="xinxineirong">{{ypzData.hys}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借出金额</p>
                <p class="xinxineirong">{{ypzData.lend_amount}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借入金额</p>
                <p class="xinxineirong">{{ypzData.borrow_amount}}</p>
              </div>
            </div>
            <p class="biaoname">信用信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">信用等级</p>
                <p class="xinxineirong">{{ypzData.level}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">履约能力</p>
                <p class="xinxineirong">{{ypzData.credit_level}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">逾期次数</p>
                <p class="xinxineirong">{{ypzData.jdyqcsz}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">申述记录</p>
                <p class="xinxineirong">{{ypzData.appeal_level}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">冻结次数</p>
                <p class="xinxineirong">{{ypzData.frozen_times}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">冻结金额</p>
                <p class="xinxineirong">{{ypzData.frozen_money}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">申诉次数</p>
                <p class="xinxineirong">{{ypzData.appeal_times}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">申诉被拒次数</p>
                <p class="xinxineirong">{{ypzData.appeal_refused_times}}</p>
              </div>
            </div>
            <p class="biaoname">借款及逾期</p>
            <p class="linetext">30天以上逾期次数<span class="numbers">{{ypzData.ypz}}</span></p>
            <p class="linetext">历史逾期金额<span class="numbers">{{ypzData.jdyqje}}</span></p>
            <p class="linetext">当前逾期金额<span class="numbers">{{ypzData.jdyqdqyq}}</span></p>
            <p class="linetext">最近一次逾期<span class="numbers">{{ypzData.jdyqsj}}</span></p>
            <p class="linetext">逾期最大天数<span class="numbers">{{ypzData.jdyqzdts}}</span></p>
            <p class="linetext">首次逾期<span class="numbers">{{ypzData.jdyqscsj}}</span></p>
            <p class="linetext">最近还款时间<span class="numbers">{{ypzData.payment_date}}</span></p>
            <p class="linetext">总还款次数<span class="numbers">{{ypzData.jdyqjrcs}}</span></p>
            <p class="linetext">正在进行的贷款笔数<span class="numbers">{{ypzData.jdyqjccs}}</span></p>
            <p class="linetext">现借入金额<span class="numbers">{{ypzData.borrow_amount}}</span></p>
            <p class="linetext">历史借款笔数<span class="numbers">{{ypzData.jdyqjrcs}}</span></p>
            <p class="linetext">账户余额<span class="numbers">{{ypzData.balance}}</span></p>
            <p class="biaoname">借贷流水</p>
            <div class="danyuanmen">
              <table>
                <tr>
                  <th>类型</th>
                  <th>金额</th>
                  <th>利息</th>
                  <th>流水状态</th>
                </tr>
                <tr v-for="(item,index,key) in myJTdataypz_bill_listyo" :key="index">
                  <th>{{item.detail_type}}</th>
                  <th>{{item.amount}}</th>
                  <th>{{item.interest}}</th>
                  <th>{{item.has_overdued}}</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!--无忧借条-->
        <div id="wuyoujietiao" class="bankuai">
          <div class="bankuaitou">
            <h5>无忧借条</h5><h6 class="huoxinxi" @click="openbox" id="wyjtpt">获取/更新用户信息</h6>
          </div>
          <div class="line"></div>
          <div class="bankuaibody">
            <p class="biaoname">基本信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">姓名</p>
                <p class="xinxineirong">{{myJTdata.name}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">电话</p>
                <p class="xinxineirong">{{myJTdata.photo}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">注册日期</p>
                <p class="xinxineirong">{{wyjtsData.register_time}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">好友数</p>
                <p class="xinxineirong">{{wyjtsData.hys}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借出金额</p>
                <p class="xinxineirong">{{wyjtsData.lend_amount}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借入金额</p>
                <p class="xinxineirong">{{wyjtsData.borrow_amount}}</p>
              </div>
            </div>
            <p class="biaoname">信用信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">信用等级</p>
                <p class="xinxineirong">{{wyjtsData.level}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">是否逾期</p>
                <p class="xinxineirong">{{wyjtsData.sfyq}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">逾期金额</p>
                <p class="xinxineirong">{{wyjtsData.jdyqje}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">逾期次数</p>
                <p class="xinxineirong">{{wyjtsData.jdyqcsz}}</p>
              </div>
            </div>
            <p class="biaoname">借款及逾期</p>
            <p class="linetext">30天以上逾期次数<span class="numbers">{{wyjtsData.jdyqsht}}</span></p>
            <p class="linetext">历史逾期金额<span class="numbers">{{wyjtsData.jdyqje}}</span></p>
            <p class="linetext">当前逾期金额<span class="numbers">{{wyjtsData.jdyqdqyq}}</span></p>
            <p class="linetext">最近一次逾期<span class="numbers">{{wyjtsData.jdyqsj}}</span></p>
            <p class="linetext">逾期最大天数<span class="numbers">{{wyjtsData.jdyqzdts}}</span></p>
            <p class="linetext">首次逾期<span class="numbers">{{wyjtsData.jdyqscsj}}</span></p>
            <p class="linetext">最近还款时间<span class="numbers">{{wyjtsData.payment_date}}</span></p>
            <p class="linetext">总还款次数<span class="numbers">{{wyjtsData.jdyqjrcs}}</span></p>
            <p class="linetext">正在进行的贷款笔数<span class="numbers">{{wyjtsData.jdyqjccs}}</span></p>
            <p class="linetext">现借入金额<span class="numbers">{{wyjtsData.borrow_amount}}</span></p>
            <p class="linetext">历史借款笔数<span class="numbers">{{wyjtsData.jdyqjrcs}}</span></p>
            <p class="linetext">账户余额<span class="numbers">{{wyjtsData.balance}}</span></p>
            <p class="biaoname">借贷流水</p>
            <div class="danyuanmen">
              <table>
                <tr>
                  <th>类型</th>
                  <th>金额</th>
                  <th>利息</th>
                  <th>流水状态</th>
                </tr>
                <tr v-for="(item,index,key) in myJTdatawyjt_bill_list" :key="index">
                  <th>{{item.detail_type}}</th>
                  <th>{{item.amount}}</th>
                  <th>{{item.interest}}</th>
                  <th>{{item.has_overdued}}</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!--米房-->
        <div id="mifang" class="bankuai">
          <div class="bankuaitou">
            <h5>米房</h5><h6 class="huoxinxi" @click="openbox" id="mfpt">获取/更新用户信息</h6>
          </div>
          <div class="line"></div>
          <div class="bankuaibody">
            <p class="biaoname">基本信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">姓名</p>
                <p class="xinxineirong">{{myJTdata.name}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">电话</p>
                <p class="xinxineirong">{{myJTdata.photo}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">注册日期</p>
                <p class="xinxineirong">{{mfsData.register_time}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">好友数</p>
                <p class="xinxineirong">{{mfsData.hys}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借出金额</p>
                <p class="xinxineirong">{{mfsData.lend_amount}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">借入金额</p>
                <p class="xinxineirong">{{mfsData.borrow_amount}}</p>
              </div>
            </div>
            <p class="biaoname">信用信息</p>
            <div class="danyuanmen">
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">信用等级</p>
                <p class="xinxineirong">{{mfsData.level}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">是否逾期</p>
                <p class="xinxineirong">{{mfsData.sfyq}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">逾期金额</p>
                <p class="xinxineirong">{{mfsData.jdyqje}}</p>
              </div>
              <div class="xinxidanyuan">
                <p class="xinxibiaoti">逾期次数</p>
                <p class="xinxineirong">{{mfsData.jdyqcsz}}</p>
              </div>
            </div>
            <p class="biaoname">借款及逾期</p>
            <p class="linetext">30天以上逾期次数<span class="numbers">{{mfsData.jdyqsht}}</span></p>
            <p class="linetext">历史逾期金额<span class="numbers">{{mfsData.jdyqje}}</span></p>
            <p class="linetext">当前逾期金额<span class="numbers">{{mfsData.jdyqdqyq}}</span></p>
            <p class="linetext">最近一次逾期<span class="numbers">{{mfsData.jdyqsj}}</span></p>
            <p class="linetext">逾期最大天数<span class="numbers">{{mfsData.jdyqzdts}}</span></p>
            <p class="linetext">首次逾期<span class="numbers">{{mfsData.jdyqscsj}}</span></p>
            <p class="linetext">最近还款时间<span class="numbers">{{mfsData.payment_date}}</span></p>
            <p class="linetext">总还款次数<span class="numbers">{{mfsData.jdyqjrcs}}</span></p>
            <p class="linetext">正在进行的贷款笔数<span class="numbers">{{mfsData.jdyqjccs}}</span></p>
            <p class="linetext">现借入金额<span class="numbers">{{mfsData.borrow_amount}}</span></p>
            <p class="linetext">历史借款笔数<span class="numbers">{{mfsData.jdyqjrcs}}</span></p>
            <p class="linetext">账户余额<span class="numbers">{{mfsData.balance}}</span></p>
            <p class="biaoname">借贷流水</p>
            <div class="danyuanmen">
              <table>
                <tr>
                  <th>类型</th>
                  <th>金额</th>
                  <th>利息</th>
                  <th>流水状态</th>
                </tr>
                <tr v-for="(item,index,key) in myJTdatamf_bill_listm" :key="index">
                  <th>{{item.detail_type}}</th>
                  <th>{{item.amount}}</th>
                  <th>{{item.interest}}</th>
                  <th>{{item.has_overdued}}</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'jietiao',
  data () {
    return {
      dialogVisible: false,
      myJTdata: '',
      myJTdatabill_list: '',
      myJTdatajjdData_bill_list: '',
      myJTdataypz_bill_listyo: '',
      myJTdatawyjt_bill_list: '',
      myJTdatamf_bill_listm: '',
      haveJT: '',
      jdbData: {},
      jjdData: {},
      ypzData: {},
      wyjtsData: {},
      mfsData: {},
      srcif: '',
      jtID: ''
    }
  },
  methods: {
    shujuqueren () {
      this.dialogVisible = false
      var that = this
      var pingtai = document.getElementById('pingtaixuanze')
      var Curl
      switch (parseInt(pingtai.value)) {
        case 1:Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getJieDaiBaoAuthUrl'
          break
        case 2:Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getJinJieDaoUrl'
          break
        case 3:Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getWuYouUrl'
          break
        case 4:Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getMiFangUrl'
          break
        case 5:Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getYouPingZhengUrl'
          break
      }
      var data = {
        jt_id: '',
        uid: this.myidD,
        trname: this.userName,
        phone: this.phone,
        card_id: this.cardID,
        url: Curl,
        types: pingtai.value
      }
      console.log(data)
      this.$axios.post('https://www.ispccn.com/Finance-Bigdata-receipt', this.$qs.stringify(data)).then(function (res) {
        that.srcif = res.data.url
        var box = document.getElementById('ifblock')
        box.style.display = 'block'
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closebox: function () {
      var box = document.getElementById('ifblock')
      box.style.display = 'none'
    },
    openbox: function (e) {
      var box = document.getElementById('ifblock')
      box.style.display = 'block'
      var that = this
      var pingtai = e.target.id
      var Curl
      var value
      switch (pingtai) {
        case 'jdbpt':Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getJieDaiBaoAuthUrl',value = 1
          break
        case 'jjdpt':Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getJinJieDaoUrl',value = 2
          break
        case 'wyjtpt':Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getWuYouUrl',value = 3
          break
        case 'mfpt':Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getMiFangUrl',value = 4
          break
        case 'ypzpt':Curl = 'http://bigdata.lvronghui.com/jietiaocrawl/getYouPingZhengUrl',value = 5
          break
      }
      var data = {
        jt_id: this.jtID,
        uid: this.myidD,
        trname: this.userName,
        phone: this.phone,
        card_id: this.cardID,
        url: Curl,
        types: value
      }
      console.log(data)
      this.$axios.post('https://www.ispccn.com/Finance-Bigdata-receipt', this.$qs.stringify(data)).then(function (res) {
        that.srcif = res.data.url
      }).catch(function (err) {
        that.fetchError(err)
      })
    }
  },
  props: [
    'myidD', 'userName', 'cardID', 'phone', 'report_id'
  ],
  watch: {
    myidD (a, b) {
      var that = this
      this.$axios.post('https://www.ispccn.com/Finance-User-receipt', this.$qs.stringify({uid: a})).then(function (res) {
        if (res.data.status === 1) {
          that.haveJT = 1
          that.jtID = res.data.id
          if (res.data.jdb !== null) {
            that.jdbData = res.data.jdb
          }
          if (res.data.jjd !== null) {
            that.jjdData = res.data.jjd
          }
          if (res.data.ypz !== null) {
            that.ypzData = res.data.ypz
          }
          if (res.data.wyjts !== null) {
            that.wyjtsData = res.data.wyjts
          }
          if (res.data.mfs !== null) {
            that.mfsData = res.data.mfs
          }
          if (res.data.mfs !== null) {
            that.mfsData = res.data.mfs
          }
          if (res.data.bill_list !== null) {
            that.myJTdatabill_list = res.data.bill_list
          }
          if (res.data.jjdData_bill_list !== null) {
            that.myJTdatajjdData_bill_list = res.data.jjdData_bill_list
          }
          if (res.data.ypz_bill_listyo !== null) {
            that.myJTdataypz_bill_listyo = res.data.ypz_bill_listyo
          }
          if (res.data.wyjt_bill_list !== null) {
            that.myJTdatawyjt_bill_list = res.data.wyjt_bill_list
          }
          if (res.data.mf_bill_listm !== null) {
            that.myJTdatamf_bill_listm = res.data.mf_bill_listm
          }
        } else {
          that.haveJT = 2
        }
      }).catch(function (err) {
        that.fetchError(err)
      })
    }
  }
}
</script>

<style scoped>
#JTheader{
  position: relative;
  height: 150px ;
}
#yuan,#tiao{
  background-color: #c44444;
  display: inline-block;
  position: absolute;
}
#yuan{
  height: 90px;
  width: 90px;
  text-align: center;
  border-radius: 50%;
  z-index: 21;
  margin-top: 30px;
  left: 2.5%;
}
  #yuan img{
    height: 60px;
    margin-top: 15px;
  }
  #tiao{
    width: 95%;
    height: 50px;
    left: 2.5%;
    margin: 50px auto;
    z-index: 20;
    border-radius: 30px;
    font-size: 24px;
    line-height: 50px;
    text-indent: 5em;
    color: white;
  }
  .bankuai{
    background-color: white;
    border: 15px;
    width: 95%;
    margin: 0 auto 40px;
    border-radius: 15px;
  }
  .bankuaitou{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bankuaibody{
    width: 93%;
    margin: 0 auto;
  }
  h5{
    font-size: 20px;
    margin-left: 25px;
  }
  h6{
    font-size: 16px;
    font-weight: normal;
    margin-right: 25px;
    color: #40c94a;
    border: 1px #40c94a solid;
    height: 30px;
    line-height: 30px;
    width: 150px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
  h6:hover{
    line-height: 35px;
  }
  .line{
    border-bottom: 1px #d2d2d2 solid;
    width: 93%;
    margin: 0 auto;
  }
  .danyuanmen{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .xinxidanyuan{
    border:1px #f0f2f8 solid;
    text-align: center;
    font-size: 14px;
    width: 24%;
  }
  .xinxibiaoti{
    background-color: #f0f2f8;
    width: 100%;
  }
  .xinxibiaoti,.xinxineirong{
    line-height: 40px;
  }
  .biaoname{
    font-size: 18px;
    color: #c44444;
    margin: 20px 0;
  }
  .linetext{
    font-size: 14px;
    height: 16px;
    border-bottom: 1px #f5f5f5 solid;
    margin: 0 auto 10px;
    line-height: 16px;
    width: 96%;
  }
  .numbers{
    float: right;
  }
  table{
    width: 100%;
    margin-bottom: 50px;
  }
  td,th{
    width: 130px;
    font-size: 14px;
    line-height: 40px;
  }
  th{
    background-color: #f0f2f8;
  }
  #ifblock{
    position: fixed;
    width: 20%;
    left: 47%;
    top: 30%;
    height: 330px;
    z-index: 999;
    background-color: white;
    border-radius: 10px;
    border: 1px #eeeeee solid;
    display: none;
    overflow: hidden;
  }
  #ifblock iframe{
    width: 100%;
    height: 100%;
  }
  #ifblock>span{
    font-size: 14px;
    border:1px #cccccc solid;
    padding: 5px 10px;
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 5px;
    cursor: pointer;
    background-color: white;
  }
  #ifblock>span:hover{
    background-color: #cccccc;
  }
  button{
    background-color: #0095c9;
    border: none;
    width: 180px;
    height: 35px;
    color: white;
    border-radius: 10px;
    font-size: 14px;
    margin: 0 20px;
    outline: none;
  }
</style>
