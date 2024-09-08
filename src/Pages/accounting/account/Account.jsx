import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as Ant from 'antd'
import { Button, Tree } from 'antd'
import * as styles from '@/styles'
import TreeNodeItem from './TreeNodeItem'
import * as api from '@/api'
import * as url from '@/api/url'
import qs from "qs";
import { RequestManager } from '@/components/common/RequestManager'
import { FrmEditAccount } from './edit/FrmEditAccount'
import { FrmEditAccountGroup } from './edit/FrmEditAccountGroup'
import { FrmEditAccountHeader } from './edit/FrmEditAccountHeader'
import CoustomContent from "@/components/common/CoustomContent";
//====================================================================
//                        Declaration
//====================================================================
const Account = () => {
  const [selectedNode, setSelectedNode] = useState(null)
  const [accData, accLoading, accError, accApiCall] = api.useFetchWithHandler()
  const [form] = Ant.Form.useForm()
  const [treeData, setTreeData] = useState([])
  const [expandedKeys, setExpandedKeys] = useState(['0'])
  const emptyDescription = 'برای نمایش جزئیات روی حساب مربوطه کلیک کنید'
  //====================================================================
  //                        Functions
  //====================================================================
  const updateTreeData = (list, key, children) => {
    console.log('tree data input', { list, key, children })
    list.map((node) => {
      if (node.id === key) {
        console.log('a', {
          ...node,
          children,
        })
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        console.log('b')
        return {
          ...node,
          children: updateTreeData(node.children, key.id, children),
        };
      }
      console.log('c')
      return node;
    });
  }



  // const loadData = (key, children) => new Promise((resolve) => {
  //   console.log({ key, children });
  //   const queryString = qs.stringify({
  //     AccountGroupId: key.id
  //   })
  //   console.log('queryString', queryString);
  //   api.GetAsync(`${url.ACCOUNT_HEADER}?${queryString}`, null).then(response => {
  //     console.log('response =>', response);
  //     console.log('upd => ', updateTreeData(treeData, key.id, response.data))
  //     resolve();
  //   })
  //     .catch(error => {
  //       console.error(error);
  //     });

  // }).then(() => { console.log('then') })
  // const FillTree = async () => {
  //   await accApiCall(url.ACCOUNT_TREE)
  // }

  const onDeleteSuccess = (item) => {
    setExpandedKeys([item.key])
    setSelectedNode(null)
  }

  const onAddSuccess = (item) => {
    setExpandedKeys([item.key])
    setSelectedNode(item.key)
  }

  // const treeify = (arr) => {
  //   const tree = []
  //   const lookup = {}
  //   arr.forEach((o) => {
  //     lookup[o.id] = o
  //     lookup[o.id].children = []
  //   })
  //   arr.forEach((o) => {
  //     if (o.parent) {
  //       lookup[o.parent]?.children?.push(o)
  //     } else {
  //       tree.push(o)
  //     }
  //   })
  //   return tree
  // }

  // const addIconToData = (data) => {
  //   const newData =
  //     data &&
  //     data.map((item) => ({
  //       ...item,
  //       //icon: icon,
  //       //parentKey: parentKey || item.parentKey,
  //       title: (
  //         <TreeNodeItem
  //           key={item.key}
  //           item={{ ...item }}
  //           onEditClick={(val) => {
  //             val && setSelectedNode(val)
  //           }}
  //           onDeleteSuccess={onDeleteSuccess}
  //           onAddSuccess={onAddSuccess}
  //         />
  //       ),
  //     }))
  //   return newData
  // }

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    FillTree()
  }, [expandedKeys])

  useEffect(() => {
    if (accData?.data) {
      // const data = addIconToData(accData.data)
      // const finalData = treeify(data)
      setTreeData(accData?.data)
    }
  }, [accData])

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      {/* {JSON.stringify(treeData)} */}
      <RequestManager error={accError} />
      <Ant.Card title={'درختواره حساب ها'} type="inner" >
        <Ant.Form form={form} layout="vertical" onFinish={null} onFinishFailed={null}>
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col span={24} md={10}>
              {/* <Ant.Card bordered style={{ ...styles.CARD_DEFAULT_STYLES }} loading={accLoading}> */}
              <CoustomContent bordered height="77vh" loading={accLoading}>
                <Tree
                
                  showIcon
                  blockNode
                  treeData={treeData}
                  // defaultExpandedKeys={expandedKeys}
                  showLine
                  autoExpandParent
                  // fieldNames={{ title: "name", key: "code", children: 'children' }}
                  // titleRender={(nodeData) => { return (<>{nodeData.code + ' - ' + nodeData.name} </>) }}
                  // loadData={loadData}
                  titleRender={(nodeData) => {
                    return (<TreeNodeItem
                      key={nodeData.key}
                      item={{ ...nodeData }}
                      onEditClick={(val) => {
                        val && setSelectedNode(val)
                      }}
                      onDeleteSuccess={onDeleteSuccess}
                      onAddSuccess={onAddSuccess}
                    />)
                  }}
                />
                {/* </Ant.Card> */}
              </CoustomContent>
            </Ant.Col>

            <Ant.Col span={24} md={14}>
              {/* <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={accLoading}> */}
              <CoustomContent bordered height="77vh" loading={accLoading}>
                {(!selectedNode || selectedNode?.level === 0) && <Ant.Empty description={emptyDescription} />}
                {selectedNode?.level === 1 && (
                  <FrmEditAccountGroup key={selectedNode?.key} accountGroupId={selectedNode?.accountGroupId} />
                )}
                {selectedNode?.level === 2 && (
                  <FrmEditAccountHeader key={selectedNode?.key} accountHeaderId={selectedNode?.accountHeaderId} />
                )}
                {selectedNode?.level === 3 && (
                  <FrmEditAccount key={selectedNode?.key} accountId={selectedNode?.accountId} />
                )}
              </CoustomContent>
              {/* </Ant.Card> */}

            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      </Ant.Card>
    </>
  )
}
export default Account
