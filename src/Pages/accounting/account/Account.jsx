import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as Ant from 'antd'
import { Button, Tree } from 'antd'
import * as styles from '@/styles'
import TreeNodeItem from './TreeNodeItem'
import { useFetch, useFetchWithHandler } from '@/api'
import * as url from '@/api/url'
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
  const [accData, accLoading, accError, accApiCall] = useFetchWithHandler()
  const [form] = Ant.Form.useForm()
  const [treeData, setTreeData] = useState([])
  const [expandedKeys, setExpandedKeys] = useState(['0'])
  const emptyDescription = 'برای نمایش جزئیات روی حساب مربوطه کلیک کنید'
  //====================================================================
  //                        Functions
  //====================================================================
  const FillTree = async () => {
    await accApiCall(url.ACCOUNT_TREE)
  }

  const onDeleteSuccess = (item) => {
    setExpandedKeys([item.key])
    setSelectedNode(null)
  }

  const onAddSuccess = (item) => {
    setExpandedKeys([item.key])
    setSelectedNode(item.key)
  }

  const treeify = (arr) => {
    const tree = []
    const lookup = {}
    arr.forEach((o) => {
      lookup[o.id] = o
      lookup[o.id].children = []
    })
    arr.forEach((o) => {
      if (o.parent ) {
        lookup[o.parent]?.children?.push(o)
      } else {
        tree.push(o)
      }
    })
    return tree
  }

  const addIconToData = (data) => {
    const newData =
      data &&
      data.map((item) => ({
        ...item,
        //icon: icon,
        //parentKey: parentKey || item.parentKey,
        title: (
          <TreeNodeItem
            key={item.key}
            item={{ ...item }}
            onEditClick={(val) => {
              val && setSelectedNode(val)
            }}
            onDeleteSuccess={onDeleteSuccess}
            onAddSuccess={onAddSuccess}
          />
        ),
      }))
    return newData
  }

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    FillTree()
  }, [expandedKeys])

  useEffect(() => {
    if (accData?.data) {
      const data = addIconToData(accData.data)
      const finalData = treeify(data)
      setTreeData(finalData)
    }
  }, [accData])

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <RequestManager error={accError} />
      <Ant.Card  title={'درختواره حساب ها'} type="inner" >
        <Ant.Form form={form} layout="vertical" onFinish={null} onFinishFailed={null}>
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col span={24} sm={10}>
              {/* <Ant.Card bordered style={{ ...styles.CARD_DEFAULT_STYLES }} loading={accLoading}> */}
              <CoustomContent bordered height="77vh" loading={accLoading}>
                <Tree
                  showIcon
                  blockNode
                  treeData={treeData}
                  defaultExpandedKeys={expandedKeys}
                  showLine
                  autoExpandParent
                  // fieldNames={{ title: "name", key: "id", children: '' }}
                  //titleRender={titleRender}
                />
              {/* </Ant.Card> */}
              </CoustomContent>
            </Ant.Col>

            <Ant.Col span={24} sm={14}>
              {/* <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={accLoading}> */}
              <CoustomContent bordered height="77vh" loading={accLoading}>
                {!selectedNode && <Ant.Empty description={emptyDescription} />}
                {selectedNode?.level === 0 && <Ant.Empty description={emptyDescription} />}
                {selectedNode?.level === 1 && (
                  <FrmEditAccountGroup key={selectedNode?.id} accountGroupId={selectedNode?.id} />
                )}
                {selectedNode?.level === 2 && (
                  <FrmEditAccountHeader key={selectedNode?.id} accountHeaderId={selectedNode?.id} />
                )}
                {selectedNode?.level === 3 && (
                  <FrmEditAccount key={selectedNode?.id} accountId={selectedNode?.id} />
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
