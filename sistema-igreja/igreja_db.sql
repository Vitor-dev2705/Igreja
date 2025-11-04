-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/11/2025 às 02:17
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `igreja_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `despesas`
--

CREATE TABLE `despesas` (
  `id` int(11) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data` date NOT NULL,
  `categoria` varchar(50) DEFAULT NULL COMMENT 'Ex: aluguel, agua, luz, salarios, manutencao',
  `forma_pagamento` enum('dinheiro','pix','transferencia','cheque','cartao','boleto') DEFAULT 'dinheiro',
  `favorecido` varchar(100) DEFAULT NULL,
  `numero_documento` varchar(50) DEFAULT NULL,
  `status` enum('pago','pendente','vencido') DEFAULT 'pago',
  `observacoes` text DEFAULT NULL,
  `usuario_registro_id` int(11) DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `doacoes`
--

CREATE TABLE `doacoes` (
  `id` int(11) NOT NULL,
  `fundoid` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data` date NOT NULL,
  `obs` text DEFAULT NULL,
  `forma` varchar(50) DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `doacoes`
--

INSERT INTO `doacoes` (`id`, `fundoid`, `valor`, `data`, `obs`, `forma`, `createdat`) VALUES
(1, 3, 300.00, '2001-05-27', 'asd', 'TED', '2025-11-03 15:24:22'),
(2, 1, 900.00, '2025-11-03', 'caixa', 'Caixa', '2025-11-03 15:27:02'),
(3, 3, 800.00, '2025-11-03', 'asd', 'Banco', '2025-11-03 15:34:50');

-- --------------------------------------------------------

--
-- Estrutura para tabela `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `data` date NOT NULL,
  `hora` time DEFAULT NULL,
  `local` varchar(100) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `tipo` enum('culto','estudo','retiro','evangelismo','social','outro') DEFAULT 'outro',
  `responsavel` varchar(100) DEFAULT NULL,
  `status` enum('planejado','confirmado','realizado','cancelado') DEFAULT 'planejado',
  `participantes_esperados` int(11) DEFAULT 0,
  `participantes_reais` int(11) DEFAULT 0,
  `orcamento` decimal(10,2) DEFAULT 0.00,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `data`, `hora`, `local`, `descricao`, `tipo`, `responsavel`, `status`, `participantes_esperados`, `participantes_reais`, `orcamento`, `data_cadastro`, `ultima_atualizacao`) VALUES
(1, 'Culto Dominical', '2025-11-03', '10:00:00', NULL, 'Culto de celebração', 'culto', NULL, 'planejado', 0, 0, 0.00, '2025-11-03 01:04:24', '2025-11-03 01:04:24'),
(2, 'Estudo Bíblico', '2025-11-05', '19:30:00', NULL, 'Estudo do livro de João', 'estudo', NULL, 'planejado', 0, 0, 0.00, '2025-11-03 01:04:24', '2025-11-03 01:04:24');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fundos`
--

CREATE TABLE `fundos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fundos`
--

INSERT INTO `fundos` (`id`, `nome`, `descricao`, `ativo`, `createdat`) VALUES
(1, 'DÍZIMO', NULL, 1, '2025-11-03 01:28:46'),
(2, 'OFERTA', NULL, 1, '2025-11-03 01:28:46'),
(3, 'OB. RELIGIOSO', NULL, 1, '2025-11-03 01:28:46'),
(4, 'CASAMENTO', NULL, 1, '2025-11-03 01:28:46'),
(5, 'CERTIDÃO', NULL, 1, '2025-11-03 01:28:46'),
(6, 'DOAÇÕES', NULL, 1, '2025-11-03 01:28:46'),
(7, 'CONTRIBUIÇÃO A.A', NULL, 1, '2025-11-03 01:28:46'),
(8, 'CRISMA', NULL, 1, '2025-11-03 01:28:46'),
(9, 'TRANSF. CASAMENTO', NULL, 1, '2025-11-03 01:28:46'),
(10, 'CURSO NOIVOS', NULL, 1, '2025-11-03 01:28:46'),
(11, 'PROMOÇÕES/EVENTOS', NULL, 1, '2025-11-03 01:28:46'),
(12, 'ALUGUEL', NULL, 1, '2025-11-03 01:28:46'),
(13, 'CONTRIBUIÇÃO BATISMO', NULL, 1, '2025-11-03 01:28:46');

-- --------------------------------------------------------

--
-- Estrutura para tabela `inventario`
--

CREATE TABLE `inventario` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `quantidade` int(11) DEFAULT 1,
  `categoria` varchar(50) DEFAULT NULL COMMENT 'Ex: moveis, eletronicos, instrumentos, livros',
  `descricao` text DEFAULT NULL,
  `estado` enum('novo','bom','regular','ruim','quebrado') DEFAULT 'bom',
  `localizacao` varchar(100) DEFAULT NULL COMMENT 'Onde está guardado',
  `valor_estimado` decimal(10,2) DEFAULT NULL,
  `data_aquisicao` date DEFAULT NULL,
  `numero_patrimonio` varchar(50) DEFAULT NULL,
  `responsavel` varchar(100) DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `membros`
--

CREATE TABLE `membros` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `rg` varchar(20) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `sexo` enum('M','F','Outro') DEFAULT NULL,
  `estado_civil` varchar(20) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `endereco` text DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `data_batismo` date DEFAULT NULL,
  `data_membro` date DEFAULT NULL,
  `situacao` enum('ativo','inativo','transferido','falecido') DEFAULT 'ativo',
  `observacoes` text DEFAULT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pastorais`
--

CREATE TABLE `pastorais` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `coordenador` varchar(100) DEFAULT NULL,
  `coordenador_id` int(11) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `dia_reuniao` varchar(50) DEFAULT NULL COMMENT 'Ex: Quintas 19h',
  `local_reuniao` varchar(100) DEFAULT NULL,
  `membros_count` int(11) DEFAULT 0,
  `ativa` tinyint(1) DEFAULT 1,
  `data_fundacao` date DEFAULT NULL,
  `contato` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pastoral_membros`
--

CREATE TABLE `pastoral_membros` (
  `id` int(11) NOT NULL,
  `pastoral_id` int(11) NOT NULL,
  `membro_id` int(11) NOT NULL,
  `funcao` varchar(50) DEFAULT NULL COMMENT 'Ex: coordenador, secretario, membro',
  `data_entrada` date DEFAULT NULL,
  `data_saida` date DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Acionadores `pastoral_membros`
--
DELIMITER $$
CREATE TRIGGER `trg_atualizar_membros_pastoral` AFTER INSERT ON `pastoral_membros` FOR EACH ROW BEGIN
    UPDATE pastorais 
    SET membros_count = (
        SELECT COUNT(*) 
        FROM pastoral_membros 
        WHERE pastoral_id = NEW.pastoral_id AND ativo = TRUE
    )
    WHERE id = NEW.pastoral_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `presenca`
--

CREATE TABLE `presenca` (
  `id` int(11) NOT NULL,
  `evento_id` int(11) NOT NULL,
  `membro_id` int(11) NOT NULL,
  `presente` tinyint(1) DEFAULT 1,
  `data_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `papel` varchar(50) DEFAULT 'membro' COMMENT 'admin, secretario, tesoureiro, membro',
  `ativo` tinyint(1) DEFAULT 1,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `papel`, `ativo`, `data_cadastro`, `ultima_atualizacao`) VALUES
(1, 'Anderson Vitor Soares Teles', 'admin@igreja.com', '$2b$10$example', 'admin', 1, '2025-11-03 01:04:23', '2025-11-03 01:04:23'),
(2, 'Secretária da Igreja', 'secretaria@igreja.com', '$2b$10$example', 'secretario', 1, '2025-11-03 01:04:23', '2025-11-03 01:04:23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `voluntarios`
--

CREATE TABLE `voluntarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `membro_id` int(11) DEFAULT NULL,
  `tarefa` varchar(150) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL COMMENT 'Ex: louvor, infantil, som, limpeza',
  `contato` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `disponibilidade` text DEFAULT NULL COMMENT 'Ex: domingos manhã, quartas noite',
  `habilidades` text DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `data_inicio` date DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_membros_ativos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_membros_ativos` (
`id` int(11)
,`nome` varchar(100)
,`telefone` varchar(20)
,`celular` varchar(20)
,`email` varchar(100)
,`cidade` varchar(50)
,`idade` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_proximos_eventos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_proximos_eventos` (
`id` int(11)
,`titulo` varchar(150)
,`data` date
,`hora` time
,`local` varchar(100)
,`tipo` enum('culto','estudo','retiro','evangelismo','social','outro')
,`status` enum('planejado','confirmado','realizado','cancelado')
,`dias_restantes` int(7)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_resumo_financeiro`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_resumo_financeiro` (
`mes` varchar(7)
,`total_doacoes` decimal(32,2)
,`total_despesas` decimal(32,2)
,`saldo` decimal(33,2)
);

-- --------------------------------------------------------

--
-- Estrutura para view `vw_membros_ativos`
--
DROP TABLE IF EXISTS `vw_membros_ativos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_membros_ativos`  AS SELECT `membros`.`id` AS `id`, `membros`.`nome` AS `nome`, `membros`.`telefone` AS `telefone`, `membros`.`celular` AS `celular`, `membros`.`email` AS `email`, `membros`.`cidade` AS `cidade`, timestampdiff(YEAR,`membros`.`data_nascimento`,curdate()) AS `idade` FROM `membros` WHERE `membros`.`situacao` = 'ativo' ORDER BY `membros`.`nome` ASC ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_proximos_eventos`
--
DROP TABLE IF EXISTS `vw_proximos_eventos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_proximos_eventos`  AS SELECT `eventos`.`id` AS `id`, `eventos`.`titulo` AS `titulo`, `eventos`.`data` AS `data`, `eventos`.`hora` AS `hora`, `eventos`.`local` AS `local`, `eventos`.`tipo` AS `tipo`, `eventos`.`status` AS `status`, to_days(`eventos`.`data`) - to_days(curdate()) AS `dias_restantes` FROM `eventos` WHERE `eventos`.`data` >= curdate() AND `eventos`.`status` <> 'cancelado' ORDER BY `eventos`.`data` ASC ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_resumo_financeiro`
--
DROP TABLE IF EXISTS `vw_resumo_financeiro`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_resumo_financeiro`  AS SELECT date_format(`d`.`data`,'%Y-%m') AS `mes`, sum(`d`.`valor`) AS `total_doacoes`, (select sum(`despesas`.`valor`) from `despesas` where date_format(`despesas`.`data`,'%Y-%m') = date_format(`d`.`data`,'%Y-%m')) AS `total_despesas`, sum(`d`.`valor`) - coalesce((select sum(`despesas`.`valor`) from `despesas` where date_format(`despesas`.`data`,'%Y-%m') = date_format(`d`.`data`,'%Y-%m')),0) AS `saldo` FROM `doacoes` AS `d` GROUP BY date_format(`d`.`data`,'%Y-%m') ORDER BY date_format(`d`.`data`,'%Y-%m') DESC ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `despesas`
--
ALTER TABLE `despesas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_data` (`data`),
  ADD KEY `idx_categoria` (`categoria`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `usuario_registro_id` (`usuario_registro_id`);

--
-- Índices de tabela `doacoes`
--
ALTER TABLE `doacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_fundoid` (`fundoid`);

--
-- Índices de tabela `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_data` (`data`),
  ADD KEY `idx_tipo` (`tipo`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_eventos_data_status` (`data`,`status`);

--
-- Índices de tabela `fundos`
--
ALTER TABLE `fundos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_nome` (`nome`),
  ADD KEY `idx_categoria` (`categoria`),
  ADD KEY `idx_estado` (`estado`);

--
-- Índices de tabela `membros`
--
ALTER TABLE `membros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `idx_nome` (`nome`),
  ADD KEY `idx_cpf` (`cpf`),
  ADD KEY `idx_situacao` (`situacao`),
  ADD KEY `idx_membros_situacao_nome` (`situacao`,`nome`);

--
-- Índices de tabela `pastorais`
--
ALTER TABLE `pastorais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_nome` (`nome`),
  ADD KEY `idx_ativa` (`ativa`),
  ADD KEY `coordenador_id` (`coordenador_id`);

--
-- Índices de tabela `pastoral_membros`
--
ALTER TABLE `pastoral_membros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_pastoral_membro` (`pastoral_id`,`membro_id`),
  ADD KEY `idx_pastoral` (`pastoral_id`),
  ADD KEY `idx_membro` (`membro_id`);

--
-- Índices de tabela `presenca`
--
ALTER TABLE `presenca`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_presenca` (`evento_id`,`membro_id`),
  ADD KEY `idx_evento` (`evento_id`),
  ADD KEY `idx_membro` (`membro_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_papel` (`papel`);

--
-- Índices de tabela `voluntarios`
--
ALTER TABLE `voluntarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_nome` (`nome`),
  ADD KEY `idx_area` (`area`),
  ADD KEY `idx_ativo` (`ativo`),
  ADD KEY `membro_id` (`membro_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `despesas`
--
ALTER TABLE `despesas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `doacoes`
--
ALTER TABLE `doacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `fundos`
--
ALTER TABLE `fundos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `membros`
--
ALTER TABLE `membros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pastorais`
--
ALTER TABLE `pastorais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pastoral_membros`
--
ALTER TABLE `pastoral_membros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `presenca`
--
ALTER TABLE `presenca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `voluntarios`
--
ALTER TABLE `voluntarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `despesas`
--
ALTER TABLE `despesas`
  ADD CONSTRAINT `despesas_ibfk_1` FOREIGN KEY (`usuario_registro_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `doacoes`
--
ALTER TABLE `doacoes`
  ADD CONSTRAINT `doacoes_ibfk_1` FOREIGN KEY (`fundoid`) REFERENCES `fundos` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `pastorais`
--
ALTER TABLE `pastorais`
  ADD CONSTRAINT `pastorais_ibfk_1` FOREIGN KEY (`coordenador_id`) REFERENCES `membros` (`id`) ON DELETE SET NULL;

--
-- Restrições para tabelas `pastoral_membros`
--
ALTER TABLE `pastoral_membros`
  ADD CONSTRAINT `pastoral_membros_ibfk_1` FOREIGN KEY (`pastoral_id`) REFERENCES `pastorais` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pastoral_membros_ibfk_2` FOREIGN KEY (`membro_id`) REFERENCES `membros` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `presenca`
--
ALTER TABLE `presenca`
  ADD CONSTRAINT `presenca_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `presenca_ibfk_2` FOREIGN KEY (`membro_id`) REFERENCES `membros` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `voluntarios`
--
ALTER TABLE `voluntarios`
  ADD CONSTRAINT `voluntarios_ibfk_1` FOREIGN KEY (`membro_id`) REFERENCES `membros` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
