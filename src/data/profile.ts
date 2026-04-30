export const profile = {
  name: '刘欣',
  nameEn: 'Liu Xin',
  titles: ['Java 资深工程师', 'Web3 区块链开发者', 'AI 智能体协调专家'],
  slogan: '在金融基础设施中沉淀工程经验，在链上与智能体之间寻找新的协作范式。',
  bio: `资深 Java 后端工程师，拥有金融行业大型项目的实战经验，
  先后参与银行卡核心系统迁移、信用卡积分平台等关键业务系统的设计与落地，
  熟悉高并发、分布式事务与稳定性治理。
  同时专注于 Web3 区块链应用开发与 AI 多智能体系统协调，
  对去中心化协议、智能合约工程化、LLM Agent 编排有持续实践与思考，
  致力于在传统金融基础设施、可信链上计算与自主智能之间，找到新的工程范式。`,
  email: 'liuxin@xinxq.com',
  social: {
    github: 'https://github.com/liu0510',
    twitter: 'https://x.com/',
    linkedin: 'https://www.linkedin.com/',
  },
};

export const skills: { group: string; items: { name: string; level: number }[] }[] = [
  {
    group: 'Java / Backend',
    items: [
      { name: 'Java / JVM', level: 95 },
      { name: 'Spring / Spring Cloud', level: 92 },
      { name: 'MySQL / Oracle', level: 88 },
      { name: 'Redis / Kafka', level: 88 },
      { name: '分布式 / 高并发架构', level: 90 },
      { name: '金融业务建模', level: 90 },
    ],
  },
  {
    group: 'Web3 / Blockchain',
    items: [
      { name: 'Solidity', level: 88 },
      { name: 'EVM / Layer2', level: 85 },
      { name: 'Foundry / Hardhat', level: 86 },
      { name: 'DeFi 协议设计', level: 82 },
    ],
  },
  {
    group: 'AI Agents',
    items: [
      { name: 'LLM Agent 编排', level: 88 },
      { name: 'MCP / Tool Use', level: 85 },
      { name: 'RAG / 向量检索', level: 82 },
      { name: 'Multi-Agent 协作', level: 85 },
    ],
  },
];
