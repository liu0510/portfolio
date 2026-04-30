export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  year: string;
};

export const projects: Project[] = [
  {
    title: '银行卡核心系统迁移',
    description:
      '参与某大型银行卡核心系统的整体迁移与重构，覆盖账务、清算、批处理等关键域，在严苛的窗口期内完成新老系统切换、数据并行验证与生产灰度，保障核心业务的零中断过渡。',
    tags: ['Java', 'Spring', 'Oracle', '分布式事务', '大型金融系统'],
    year: '2023',
  },
  {
    title: '信用卡积分平台',
    description:
      '负责信用卡积分体系的平台化建设，从积分发放、消费抵扣、营销活动到跨业务结算，构建统一的规则引擎与对账机制，支撑千万级用户、亿级日交易量的稳定运转。',
    tags: ['Java', 'Spring Cloud', 'MySQL', 'Redis', 'Kafka'],
    year: '2022',
  },
  {
    title: 'On-Chain Agent Coordination',
    description:
      '基于智能合约与 LLM Agent 的链上协作框架，把多智能体的决策与执行轨迹固化到链上，提供可验证的协作过程。',
    tags: ['Solidity', 'LangGraph', 'EVM', 'TypeScript'],
    year: '2025',
  },
  {
    title: 'AI Agent Studio',
    description:
      '可视化 Agent 编排平台，支持工具调用、记忆、子流程嵌套，用于业务流程的智能化改造。',
    tags: ['React', 'Python', 'MCP', 'PostgreSQL'],
    year: '2024',
  },
];
