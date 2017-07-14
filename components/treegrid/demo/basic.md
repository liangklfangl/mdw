---
order: 0
iframe: true
title:
  zh-CN: 树形展示框
  en-US: TreeGrid
---

## zh-CN

树形展示框。

## en-US


```js
const mountNode = document.getElementById('app');
mountNode.innerHTML = `
             <table class="J_Tree uni-table">
                <tr class="row">
                    <th class="col-sm-1">ID</th>
                    <th class="col-sm-2">标题名称</th>
                    <th class="col-sm-1">坑位类型</th>
                    <th class="col-sm-1">坑位背景图</th>
                    <th class="col-sm-1">设备／版本号</th>
                    <th class="col-sm-1">位置(排序)</th>
                    <th class="col-sm-2">创建／更新时间</th>
                    <th class="col-sm-1">发布状态</th>
                    <th class="col-sm-2">操作</th>
                </tr>
                <tr class="row treegrid-1">
                  <td class="col-sm-1">1</td>
                  <td class="col-sm-2">
                    <a href="/video/v5video/item/detail.htm?id=328" class=" J_dialog" dia_width="90%" hl_title="查看坑位详情"> 登录会员账号 </a>
                    <p>大河儿女测试</p>
                  </td>
                  <td class="col-sm-1">上次观看</td>
                  <td class="col-sm-1">
                    <img src="http://galitv.alicdn.com/develop/image/2016-11-03/ebb2b38ec5fb663fdefb5f77d8149a23.png" height="60px" width="80px">
                  </td>
                  <td class="col-sm-1">
                    <nobr>Default</nobr><br><nobr>2100400000</nobr>
                  </td>
                  <td>
                    <a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changePosition.htm" data-pk="2189" data-name="position" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">1</a>
                    <nobr>(<a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changeSort.htm" data-pk="2189" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">3</a>)</nobr>
                  </td>
                  <td class="col-sm-2">
                    <nobr>2016-09-22 11:08:31</nobr><br><nobr>2017-02-07 16:39:23</nobr>
                  </td>
                  <td class="col-sm-1">
                    <span class="text-muted">已发布</span>
                  </td>
                  <td class="col-sm-2">
                    <div class="J_more_menu btn-group">
                                        <a href="/video/v5video/item/sche/edit.htm?id=46" warn_link="/video/v5video/item/sche/warn.htm?id=46" class="J_dialog" dia_width="90%" hl_title="编辑元数据">编辑</a>
                                       <span class="vertical-divider"></span>
                                        <a href="/video/v5video/module_sche/delete.htm?scheId=46&amp;moduleId=587" class="J_ajax_post " msg="你确定删除吗？">删除</a>
                                    <span class="vertical-divider"></span><a href="/system/gated_launch/dataChangeList.htm?operationTable=v5_videodesktop_item_sche_pre&amp;operationId=46&amp;_tb_token_=" class="J_dialog" dia_width="90%" dia_height="700px" hl_title="变更记录查询">变更记录</a></div>
                  </td>
                </tr>
                <tr class="row treegrid-2 treegrid-parent-1">
                  <td class="col-sm-1">2</td>
                  <td class="col-sm-2"><a href="/video/v5video/item/detail.htm?id=328" class=" J_dialog" dia_width="90%" hl_title="查看坑位详情"> 登录会员账号 </a>
                    <p>大河儿女测试</p></td>
                  <td class="col-sm-1">上次观看</td>
                  <td class="col-sm-1">
                    <img src="http://galitv.alicdn.com/develop/image/2016-11-03/ebb2b38ec5fb663fdefb5f77d8149a23.png" height="60px" width="80px">
                  </td>
                  <td class="col-sm-1">
                    <nobr>Default</nobr><br><nobr>2100400000</nobr>
                  </td>
                  <td>
                    <a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changePosition.htm" data-pk="2189" data-name="position" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">1</a>
                    <nobr>(<a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changeSort.htm" data-pk="2189" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">3</a>)</nobr>
                  </td>
                  <td class="col-sm-2">
                    <nobr>2016-09-22 11:08:31</nobr><br><nobr>2017-02-07 16:39:23</nobr>
                  </td>
                  <td class="col-sm-1">
                    <span class="text-muted">已发布</span>
                  </td>
                  <td class="col-sm-2">
                    <div class="J_more_menu btn-group">
                            <a href="/video/v5video/item/sche/edit.htm?id=46" warn_link="/video/v5video/item/sche/warn.htm?id=46" class="J_dialog" dia_width="90%" hl_title="编辑元数据">编辑</a>
                                <span class="vertical-divider"></span>
                            <a href="/video/v5video/module_sche/delete.htm?scheId=46&amp;moduleId=587" class="J_ajax_post " msg="你确定删除吗？">删除</a>
                        <span class="vertical-divider"></span><a href="/system/gated_launch/dataChangeList.htm?operationTable=v5_videodesktop_item_sche_pre&amp;operationId=46&amp;_tb_token_=" class="J_dialog" dia_width="90%" dia_height="700px" hl_title="变更记录查询">变更记录</a></div>
                  </td>
                </tr>
                <tr class="row treegrid-3">
                  <td class="col-sm-1">3</td>
                  <td class="col-sm-2"><a href="/video/v5video/item/detail.htm?id=328" class=" J_dialog" dia_width="90%" hl_title="查看坑位详情"> 登录会员账号 </a>
                    <p>大河儿女测试</p></td>
                  <td class="col-sm-1">上次观看</td>
                  <td class="col-sm-1">
                    <img src="http://galitv.alicdn.com/develop/image/2016-11-03/ebb2b38ec5fb663fdefb5f77d8149a23.png" height="60px" width="80px">
                  </td>
                  <td class="col-sm-1">
                    <nobr>Default</nobr><br><nobr>2100400000</nobr>
                  </td>
                  <td>
                    <a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changePosition.htm" data-pk="2189" data-name="position" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">1</a>
                    <nobr>(<a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changeSort.htm" data-pk="2189" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">3</a>)</nobr>
                  </td>
                  <td class="col-sm-2">
                    <nobr>2016-09-22 11:08:31</nobr><br><nobr>2017-02-07 16:39:23</nobr>
                  </td>
                  <td class="col-sm-1">
                    <span class="text-muted">已发布</span>
                  </td>
                  <td class="col-sm-2">
                   <div class="J_more_menu btn-group">
                            <a href="/video/v5video/item/sche/edit.htm?id=46" warn_link="/video/v5video/item/sche/warn.htm?id=46" class="J_dialog" dia_width="90%" hl_title="编辑元数据">编辑</a>
                            <span class="vertical-divider"></span>
                            <a href="/video/v5video/module_sche/delete.htm?scheId=46&amp;moduleId=587" class="J_ajax_post " msg="你确定删除吗？">删除</a>
                        <span class="vertical-divider"></span><a href="/system/gated_launch/dataChangeList.htm?operationTable=v5_videodesktop_item_sche_pre&amp;operationId=46&amp;_tb_token_=" class="J_dialog" dia_width="90%" dia_height="700px" hl_title="变更记录查询">变更记录</a></div>
                  </td>
                </tr>
                <tr class="row treegrid-4 treegrid-parent-3">
                  <td class="col-sm-1">4</td>
                  <td class="col-sm-2">
                    <a href="/video/v5video/item/detail.htm?id=328" class=" J_dialog" dia_width="90%" hl_title="查看坑位详情"> 登录会员账号 </a>
                    <p>大河儿女测试</p>

                    <div class="tag-info" data-ids="4">
                        <label class="gated-label label label-default">灰度</label>
                        <span class="label label-info">TBO会员</span>
                        <span class="label label-info">账号已登录</span>
                        <span class="label label-info">TBO会员</span>
                        <span class="label label-info">账号已登录</span>
                    </div>
                  </td>
                  <td class="col-sm-1">上次观看</td>
                  <td class="col-sm-1">
                    <img src="http://galitv.alicdn.com/develop/image/2016-11-03/ebb2b38ec5fb663fdefb5f77d8149a23.png" height="60px" width="80px">
                  </td>
                  <td class="col-sm-1">
                    <nobr>Default</nobr><br><nobr>2100400000</nobr>
                  </td>
                  <td>
                    <a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changePosition.htm" data-pk="2189" data-name="position" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">1</a>
                    (<a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changeSort.htm" data-pk="2189" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">3</a>)</nobr>
                  </td>
                  <td class="col-sm-2">
                    <nobr>2016-09-22 11:08:31</nobr><br><nobr>2017-02-07 16:39:23</nobr>
                  </td>
                  <td class="col-sm-1">
                    <span class="text-red user-info" data-account="bingxi@alibaba-inc.com" data-original-title="" title=""><b>有变更</b></span>
                  </td>
                  <td class="col-sm-2">
                    <div class="J_more_menu btn-group">
                            <a href="/video/v5video/item/sche/edit.htm?id=46" warn_link="/video/v5video/item/sche/warn.htm?id=46" class="J_dialog" dia_width="90%" hl_title="编辑元数据">编辑</a>
<span class="vertical-divider"></span>
                            <a href="/video/v5video/module_sche/delete.htm?scheId=46&amp;moduleId=587" class="J_ajax_post " msg="你确定删除吗？">删除</a>
                        <span class="vertical-divider"></span><a href="/system/gated_launch/dataChangeList.htm?operationTable=v5_videodesktop_item_sche_pre&amp;operationId=46&amp;_tb_token_=" class="J_dialog" dia_width="90%" dia_height="700px" hl_title="变更记录查询">变更记录</a></div>
                  </td>
                </tr>
                <tr class="row treegrid-5 treegrid-parent-3">
                  <td class="col-sm-1">4</td>
                  <td class="col-sm-2"><a href="/video/v5video/item/detail.htm?id=328" class=" J_dialog" dia_width="90%" hl_title="查看坑位详情"> 登录会员账号 </a>
                    <p>大河儿女测试</p></td>
                  <td class="col-sm-1">上次观看</td>
                  <td class="col-sm-1">
                    <img src="http://galitv.alicdn.com/develop/image/2016-11-03/ebb2b38ec5fb663fdefb5f77d8149a23.png" height="60px" width="80px">
                  </td>
                  <td class="col-sm-1">
                    <nobr>Default</nobr><br><nobr>2100400000</nobr>
                  </td>
                  <td>
                    <a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changePosition.htm" data-pk="2189" data-name="position" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">1</a>
                    <nobr>(<a href="#" class="J_sort editable editable-click" data-url="/video/v5video/module_item/changeSort.htm" data-pk="2189" style="display: inline-block; width: 37px; border-bottom-width: 0px; text-align: center;">3</a>)</nobr>
                  </td>
                  <td class="col-sm-2">
                    <nobr>2016-09-22 11:08:31</nobr><br><nobr>2017-02-07 16:39:23</nobr>
                  </td>
                  <td class="col-sm-1">
                    <span class="text-muted">已发布</span>
                  </td>
                  <td class="col-sm-2">
                    <div class="J_more_menu btn-group">
                            <a href="/video/v5video/item/sche/edit.htm?id=46" warn_link="/video/v5video/item/sche/warn.htm?id=46" class="J_dialog" dia_width="90%" hl_title="编辑元数据">编辑</a>
<span class="vertical-divider"></span>
                            <a href="/video/v5video/module_sche/delete.htm?scheId=46&amp;moduleId=587" class="J_ajax_post " msg="你确定删除吗？">删除</a>
                        <span class="vertical-divider"></span><a href="/system/gated_launch/dataChangeList.htm?operationTable=v5_videodesktop_item_sche_pre&amp;operationId=46&amp;_tb_token_=" class="J_dialog" dia_width="90%" dia_height="700px" hl_title="变更记录查询">变更记录</a></div>
                  </td>
                </tr>
                <tr class="row treegrid-6 treegrid-parent-5 treegrid-hide">
                  <td class="col-sm-1">4</td>
                  <td class="col-sm-2"><a href="/video/v5video/item/detail.htm?id=328" class=" J_dialog" dia_width="90%" hl_title="查看坑位详情"> 登录会员账号 </a>
                    <p>大河儿女测试</p>
                    <div class="tag-info" data-ids="4">
                        <span class="label label-info">定时</span>
                    </div>
                  </td>
                  <td class="col-sm-1">上次观看</td>
                  <td class="col-sm-1">
                    <img src="http://galitv.alicdn.com/develop/image/2016-11-03/ebb2b38ec5fb663fdefb5f77d8149a23.png" height="60px" width="80px">
                  </td>
                  <td colspan="2" class="timing text-red" style="text-align:center;">
                     <nobr>2016-09-22 11:08:31</nobr>~<nobr>2017-02-07 16:39:23</nobr>
                  </td>
                  <td class="col-sm-2">
                    <nobr>2016-09-22 11:08:31</nobr><br><nobr>2017-02-07 16:39:23</nobr>
                  </td>
                  <td class="col-sm-1">
                    <span class="text-muted">已发布</span>
                  </td>
                  <td class="col-sm-2">
                  <div class="J_more_menu btn-group">
                            <a href="/video/v5video/item/sche/edit.htm?id=46" warn_link="/video/v5video/item/sche/warn.htm?id=46" class="J_dialog" dia_width="90%" hl_title="编辑元数据">编辑</a>
<span class="vertical-divider"></span>
                            <a href="/video/v5video/module_sche/delete.htm?scheId=46&amp;moduleId=587" class="J_ajax_post " msg="你确定删除吗？">删除</a>
                        <span class="vertical-divider"></span><a href="/system/gated_launch/dataChangeList.htm?operationTable=v5_videodesktop_item_sche_pre&amp;operationId=46&amp;_tb_token_=" class="J_dialog" dia_width="90%" dia_height="700px" hl_title="变更记录查询">变更记录</a></div>
                  </td>
                </tr>
              </table>

              <table class="uni-table table-hover" style="margin-top:20px">
                    <tbody>
                        <tr>
                            <th>主题ID</th>
                            <th class="col-xs-4">主题名称</th>
                            <th>主题来源</th>
                            <th>关联专题</th>
                            <th>节目总数</th>
                            <th>策略</th>
                            <th>更新者</th>
                            <th>状态</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                                                    <tr>
                                <td>1059</td>
                                <td><a href="/topic/rule/detail.htm?id=1059">ddddd犯罪大全</a></td>
                                <td><span class="label label-default">自主创建</span></td>
                                <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=0" class="J_dialog">0</a></span></td>
                                <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=1059">66</a></span></td>
                                <td><span class="label label-default">与</span></td>
                                <td><span class="label label-default">张诗尧</span></td>
                                <td> <span class="label label-success">上线</span> </td>
                                <td>2017-02-17 10:08:17</td>
                                <td>
                                    <div class="btn-group">
                                        <a href="/topic/rule/edit.htm?id=1059" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=1059&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=1059" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>1058</td>
    <td><a href="/topic/rule/detail.htm?id=1058">正辰测试-一体机</a></td>
    <td><span class="label label-default">自主创建</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=0" class="J_dialog">0</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=1058">93</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default">李华伟</span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-15 16:22:32</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=1058" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=1058&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=1058" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>1057</td>
    <td><a href="/topic/rule/detail.htm?id=1057">d</a></td>
    <td><span class="label label-default">自主创建</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=0" class="J_dialog">0</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=1057">258</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default">邵振江</span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-06 11:51:10</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=1057" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=1057&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=1057" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>860</td>
    <td><a href="/topic/rule/detail.htm?id=860">大后台横向专题2[754081613]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=754081613" class="J_dialog">754081613</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=860">2</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=860" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=860&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=860" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>859</td>
    <td><a href="/topic/rule/detail.htm?id=859">测试01[986138616]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=986138616" class="J_dialog">986138616</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=859">11</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:19</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=859" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=859&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=859" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>858</td>
    <td><a href="/topic/rule/detail.htm?id=858">横向新增[821131010]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=821131010" class="J_dialog">821131010</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=858">1</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=858" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=858&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=858" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>857</td>
    <td><a href="/topic/rule/detail.htm?id=857">test[445389311]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=445389311" class="J_dialog">445389311</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=857">1</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=857" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=857&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=857" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>856</td>
    <td><a href="/topic/rule/detail.htm?id=856">张－纵向[279019731]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=279019731" class="J_dialog">279019731</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=856">8</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=856" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=856&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=856" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>855</td>
    <td><a href="/topic/rule/detail.htm?id=855">冰河世纪[1148271518]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=1148271518" class="J_dialog">1148271518</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=855">3</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=855" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=855&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=855" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>854</td>
    <td><a href="/topic/rule/detail.htm?id=854">大后台横向专题2[153505737]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=153505737" class="J_dialog">153505737</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=854">1</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=854" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=854&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=854" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>853</td>
    <td><a href="/topic/rule/detail.htm?id=853">普通横向专题[123332723]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=123332723" class="J_dialog">123332723</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=853">6</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:19</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=853" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=853&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=853" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>852</td>
    <td><a href="/topic/rule/detail.htm?id=852">专题哼哼[477676382]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=477676382" class="J_dialog">477676382</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=852">2</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:19</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=852" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=852&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=852" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>851</td>
    <td><a href="/topic/rule/detail.htm?id=851">排行榜[884614748]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=884614748" class="J_dialog">884614748</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=851">4</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=851" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=851&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=851" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>850</td>
    <td><a href="/topic/rule/detail.htm?id=850">纵向专题带视频窗[776586987]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=776586987" class="J_dialog">776586987</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=850">2</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:19</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=850" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=850&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=850" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>849</td>
    <td><a href="/topic/rule/detail.htm?id=849">222222222222[324324]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=324324" class="J_dialog">324324</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=849">1</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=849" class="btn btn-primary btn-xs">编辑</a>
        <a href="/topic/rule/status.htm?id=849&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
        </a><a href="/topic/rule/delete.htm?id=849" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
</div>
    </td>
</tr>
                        <tr>
    <td>848</td>
    <td><a href="/topic/rule/detail.htm?id=848">数码和生活0单六测试[923714579]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=923714579" class="J_dialog">923714579</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=848">17</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:19</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=848" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=848&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=848" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>847</td>
    <td><a href="/topic/rule/detail.htm?id=847">张-横向[573082228]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=573082228" class="J_dialog">573082228</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=847">5</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=847" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=847&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=847" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>846</td>
    <td><a href="/topic/rule/detail.htm?id=846">带分组横向专题[279377457]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=279377457" class="J_dialog">279377457</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=846">3</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:19</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=846" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=846&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=846" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>845</td>
    <td><a href="/topic/rule/detail.htm?id=845">大后台纵向专题-拷贝[569410850]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=569410850" class="J_dialog">569410850</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=845">1</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=845" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=845&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=845" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
        </div>
    </td>
</tr>
                        <tr>
    <td>844</td>
    <td><a href="/topic/rule/detail.htm?id=844">横向专题ycc[157889464]</a></td>
    <td><span class="label label-default">同步专题</span></td>
    <td><span class="label label-default"><a href="http://mytv-test.alibaba.net/common/topic/detail.htm?id=157889464" class="J_dialog">157889464</a></span></td>
    <td><span class="label label-default"><a href="/topic/rule/program/detail.htm?ruleId=844">9</a></span></td>
    <td><span class="label label-default">与</span></td>
    <td><span class="label label-default"></span></td>
    <td> <span class="label label-success">上线</span> </td>
    <td>2017-02-23 18:32:20</td>
    <td>
        <div class="btn-group">
            <a href="/topic/rule/edit.htm?id=844" class="btn btn-primary btn-xs">编辑</a>
                                                    <a href="/topic/rule/status.htm?id=844&amp;status=0" msg="确定要下线吗?" class="btn btn-default btn-xs J_ajax_post">下线
                                                    </a><a href="/topic/rule/delete.htm?id=844" class="btn btn-warning btn-xs J_ajax_delete">删除</a>
                                    </div>
                                </td>
                            </tr>
                                            </tbody>
                </table>
`;
```
