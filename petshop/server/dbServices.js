const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("BD foi conectado com sucesso!");
});

class dbServices {
  static instance;

  static getdbServicesInstance() {
    if (!this.instance) {
      this.instance = new dbServices();
    }
    return this.instance;
  }

  async BuscarClientes(criterio, termo) {
    let query = "SELECT * FROM tbl_clientes";

    if (termo) {
      query += ` WHERE nome LIKE '%${termo}%'`;
    }

    if (criterio) {
      switch (criterio) {
        case "nome":
          query += " ORDER BY nome";
          break;
        case "telefone":
          query += " ORDER BY telefone";
          break;
        case "endereco":
          query += " ORDER BY endereco";
          break;
        // Adicione mais casos conforme necessário
        default:
          break;
      }
    }

    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async NovoCliente(data) {
    try {
      const query =
        "INSERT INTO tbl_clientes (nome,email,telefone,endereco) VALUES (?,?,?,?)";
      const nome = data.nome;
      const email = data.email;
      const telefone = data.telefone;
      const endereco = data.endereco;

      const response = await new Promise((resolve, reject) => {
        connection.query(
          query,
          [nome, email, telefone, endereco],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
          }
        );
      });
      console.log("Cliente inserido com sucesso");
      return response;
    } catch (error) {
      console.log("Erro ao inserir cliente :" + error);
      throw error;
    }
  }

  async DeletarCliente(id) {
    const query = `DELETE FROM tbl_clientes WHERE id = ?;`;
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, id, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Cliente nao encontrado");
      }
      console.log("Cliente foi deletado com sucessos");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }


// async DeletarCliente(id) {
//   const checkIfExistsQuery = `
//     SELECT 1
//     FROM tbl_vendas
//     WHERE EXISTS (
//       SELECT 1
//       FROM tbl_clientes
//       WHERE id = ? AND tbl_vendas.id_cliente = tbl_clientes.id
//     )
//   `;

//   const deleteClienteQuery = `DELETE FROM tbl_clientes WHERE id = ?;`;

//   try {
//     // Verificar se o cliente está associado a alguma venda
//     const existsResponse = await new Promise((resolve, reject) => {
//       connection.query(checkIfExistsQuery, id, (err, result) => {
//         if (err) reject(new Error(err.message));
//         resolve(result);
//       });
//     });

//     if (existsResponse.length > 0) {
//       throw new Error("Não é possível excluir o cliente, pois ele está associado a pelo menos uma venda.");
//     }

//     // Se o cliente não estiver associado a nenhuma venda, proceda com a exclusão do cliente
//     const deleteResponse = await new Promise((resolve, reject) => {
//       connection.query(deleteClienteQuery, id, (err, result) => {
//         if (err) reject(new Error(err.message));
//         resolve(result);
//       });
//     });

//     if (deleteResponse.affectedRows === 0) {
//       throw new Error("Cliente não encontrado");
//     }

//     console.log("Cliente foi deletado com sucesso");
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }




  async BuscarProdutos(criterio, termo) {
    let query = "SELECT * FROM tbl_produtos";

    if (termo) {
      query += ` WHERE nome LIKE '%${termo}%'`;
    }

    if (criterio) {
      switch (criterio) {
        case "nome":
          query += " ORDER BY nome";
          break;
        case "preco":
          query += " ORDER BY preco";
          break;
        case "estoque":
          query += " ORDER BY estoque";
          break;
        // Adicione mais casos conforme necessário
        default:
          break;
      }
    }

    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }



  async DeletarProduto(id) {
    const query = `DELETE FROM tbl_produtos WHERE id = ?;`;
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, id, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Produto nao encontrado");
      }
      console.log("Produto foi deletado com sucessos");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async BuscarServicos(criterio, termo) {
    let query = "SELECT * FROM tbl_servicos";

    if (termo) {
      query += ` WHERE nome LIKE '%${termo}%'`;
    }

    if (criterio) {
      switch (criterio) {
        case "nome":
          query += " ORDER BY nome";
          break;
        case "preco":
          query += " ORDER BY preco";
          break;
        case "duracao":
          query += " ORDER BY duracao";
          break;
        // Adicione mais casos conforme necessário
        default:
          break;
      }
    }

    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async NovoServico(data) {
    try {
      const query =
        "INSERT INTO tbl_servicos (nome,preco,duracao) VALUES (?,?,?)";
      const nome = data.nome;
      const preco = data.preco;
      const duracao = data.duracao;

      const response = await new Promise((resolve, reject) => {
        connection.query(query, [nome, preco, duracao], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log("Servico inserido com sucesso");
      return response;
    } catch (error) {
      console.log("Erro ao inserir servico :" + error);
      throw error;
    }
  }

  async DeletarServico(id) {
    const query = `DELETE FROM tbl_servicos WHERE id = ?;`;
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, id, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Servico nao encontrado");
      }
      console.log("Servico foi deletado com sucesso");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async EditarProduto(data) {
    let query = "UPDATE tbl_produtos SET ";
    const values = [];
    let isFirstSet = true;

    if (data.nome != null || data.nome != undefined) {
      query += `nome = ?`;
      values.push(data.nome);
      isFirstSet = false;
    }
    if (data.preco != null || data.preco != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `preco = ?`;
      values.push(data.preco);
      isFirstSet = false;
    }
    if (data.estoque != null || data.estoque != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `estoque = ?`;
      values.push(data.estoque);
    }

    query += ` WHERE id = ?`;
    values.push(data.id);

    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Produto nao encontrado");
      }
      console.log("Produto foi editado com sucesso");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async EditarCliente(data) {
    let query = "UPDATE tbl_clientes SET ";
    const values = [];
    let isFirstSet = true;

    if (data.nome != null || data.nome != undefined) {
      query += `nome = ?`;
      values.push(data.nome);
      isFirstSet = false;
    }
    if (data.email != null || data.email != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `email = ?`;
      values.push(data.email);
      isFirstSet = false;
    }
    if (data.telefone != null || data.telefone != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `telefone = ?`;
      values.push(data.telefone);
      isFirstSet = false;
    }
    if (data.endereco != null || data.endereco != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `endereco = ?`;
      values.push(data.endereco);
    }

    query += ` WHERE id = ?`;
    values.push(data.id);

    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Cliente nao encontrado");
      }
      console.log("Cliente foi editado com sucesso");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async EditarServico(data) {
    let query = "UPDATE tbl_servicos SET ";
    const values = [];
    let isFirstSet = true;

    if (data.nome != null || data.nome != undefined) {
      query += `nome = ?`;
      values.push(data.nome);
      isFirstSet = false;
    }
    if (data.preco != null || data.preco != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `preco = ?`;
      values.push(data.preco);
      isFirstSet = false;
    }

    if (data.duracao != null || data.duracao != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `duracao = ?`;
      values.push(data.duracao);
    }

    query += ` WHERE id = ?`;
    values.push(data.id);

    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Servico nao encontrado");
      }
      console.log("Servico foi editado com sucesso");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async BuscarVendas() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tbl_vendas";
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async NovaVenda(data) {
    try {
      const query =
        "INSERT INTO tbl_vendas (id_cliente,data, id_produto, id_servico) VALUES (?,NOW(), ?, ?)"; // 'NOW()' insere a data atual
  
      const { cliente, produtos, servicos } = data;
  
      const produtosString = produtos.join(", ");
      const servicosString = servicos.join(", ");
  
      const response = await new Promise((resolve, reject) => {
        connection.query(
          query,
          [cliente, produtosString, servicosString],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
          }
        );
      });
      console.log("Venda inserida com sucesso");
      return response;
    } catch (error) {
      console.log("Erro ao inserir venda: " + error);
      throw error;
    }
  }

  async DeletarVenda(id) {
    const query = `DELETE FROM tbl_vendas WHERE id = ?;`;
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, id, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Venda nao encontrada");
      }
      console.log("Venda foi deletada com sucesso");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  queryAsync(query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async queryAsyncParams(query, params) {
    try {
      return new Promise((resolve, reject) => {
        connection.query(query, params, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }
  

  async buscarInformacoesVendas() {
    try {
      // Consulta para obter informações de produtos vendidos
      const queryProdutos = `
        SELECT tbl_produtos.id, tbl_produtos.preco
        FROM tbl_produtos
        JOIN tbl_vendas ON FIND_IN_SET(tbl_produtos.id, tbl_vendas.id_produto)
      `;
      const produtos = await this.queryAsync(queryProdutos);
  
      // Consulta para obter informações de serviços vendidos
      const queryServicos = `
        SELECT tbl_servicos.id, tbl_servicos.preco
        FROM tbl_servicos
        JOIN tbl_vendas ON FIND_IN_SET(tbl_servicos.id, tbl_vendas.id_servico)
      `;
      const servicos = await this.queryAsync(queryServicos);
  
      // Calcular faturamento total de produtos
      const faturamentoProdutos = produtos.reduce(
        (total, produto) => total + parseFloat(produto.preco),
        0
      );
  
      // Calcular faturamento total de serviços
      const faturamentoServicos = servicos.reduce(
        (total, servico) => total + parseFloat(servico.preco),
        0
      );
  
      const resultadoFinal = {
        valorProdutos: faturamentoProdutos,
        valorServicos: faturamentoServicos,
      };
  
      return resultadoFinal;
    } catch (error) {
      throw error;
    }
  }

  
  async RotularClientesPremium() {
    try {
      // Calcula a média de gastos em produtos
      const queryMediaGastosProdutos = `
        SELECT AVG(total_gastos) AS media_gastos_produtos
        FROM (
          SELECT id_cliente, COALESCE(SUM(preco), 0) AS total_gastos
          FROM tbl_vendas
          JOIN tbl_produtos ON FIND_IN_SET(tbl_produtos.id, tbl_vendas.id_produto)
          GROUP BY id_cliente
        ) AS gastos_clientes
      `;
      const resultMediaGastosProdutos = await this.queryAsyncParams(queryMediaGastosProdutos, []);
      const mediaGastosProdutos = resultMediaGastosProdutos[0]?.media_gastos_produtos || 0;
  
      console.log('Média de Gastos em Produtos:', mediaGastosProdutos);
  
      // Atualiza os clientes para 'Premium' se o total gasto for maior que a média global e todos os gastos em produtos forem maiores que a média em produtos
      const queryAtualizarClientes = `
        UPDATE tbl_clientes AS c
        SET c.tipo = 'Premium' 
        WHERE c.id IN (
          SELECT g.id_cliente 
          FROM (
            SELECT id_cliente, COALESCE(SUM(preco), 0) AS total_gasto_produtos
            FROM tbl_vendas 
            JOIN tbl_produtos ON FIND_IN_SET(tbl_produtos.id, tbl_vendas.id_produto) 
            GROUP BY id_cliente
          ) AS g
          WHERE g.total_gasto_produtos > ?
        )
      `;
  
      console.log('Query de Atualização de Clientes:', queryAtualizarClientes);
  
      const resultAtualizarClientes = await this.queryAsyncParams(queryAtualizarClientes, [mediaGastosProdutos]);
  
      console.log('Resultados da Atualização de Clientes:', resultAtualizarClientes);
  
      return resultAtualizarClientes;
    } catch (error) {
      console.error('Erro ao rotular clientes como Premium:', error);
      throw error;
    }
  }
  
  
  
  //ATENDIMENTOS
  
  async BuscarAtendimentos() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tbl_atendimentos";
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async NovoAtendimento(data) {
    try {
      const query =
        "INSERT INTO tbl_atendimentos (id_profissional, hora_inicio, hora_fim) VALUES (?, ?, ?)";
  
      const { profissional, hora_inicio, hora_fim } = data;
  
      const response = await new Promise((resolve, reject) => {
        connection.query(
          query,
          [profissional, hora_inicio, hora_fim],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
          }
        );
      });
  
      console.log("Atendimento inserido com sucesso");
      return response;
    } catch (error) {
      console.log("Erro ao inserir atendimento: " + error);
      throw error;
    }
  }
  

  async DeletarAtendimento(id) {
    const query = `DELETE FROM tbl_atendimentos WHERE id = ?;`;
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, id, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Atendimento nao encontrada");
      }
      console.log("Atendimento foi deletado com sucesso");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  


  //Profissional

  async BuscarProfissional(criterio, termo) {
    let query = "SELECT * FROM tbl_profissional";
  
    if (termo) {
      query += ` WHERE nome LIKE '%${termo}%'`;
    }
  
    if (criterio) {
      switch (criterio) {
        case "nome":
          query += " ORDER BY nome";
          break;
        case "telefone":
          query += " ORDER BY telefone";
          break;
        case "endereco":
          query += " ORDER BY endereco";
          break;
        case "cargo":
          query += " ORDER BY cargo";
          break;
        case "salario":
            query += " ORDER BY salario";
            break;
        // Adicione mais casos conforme necessário
        default:
          break;
      }
    }
  
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
 

   async NovoProfissional(data) {
     try {
      const query =
         "INSERT INTO tbl_profissional (nome,email,telefone,endereco,cargo,salario) VALUES (?,?,?,?,?,?)";
       const nome = data.nome;
      const email = data.email;
       const telefone = data.telefone;
       const endereco = data.endereco;
       const cargo = data.cargo;
       const salario = data.salario;

      const response = await new Promise((resolve, reject) => {
        connection.query(
           query,
         [nome, email, telefone, endereco, cargo, salario],
          (err, result) => {
             if (err) reject(new Error(err.message));
            resolve(result);
           }
         );
      });
       console.log("Profissional inserido com sucesso");
       return response;
     } catch (error) {
       console.log("Erro ao inserir profissional :" + error);
       throw error;
     }
   }

   async DeletarProfissional(id) {
     const query = `DELETE FROM tbl_profissional WHERE id = ?;`;
     try {
       const response = await new Promise((resolve, reject) => {
         connection.query(query, id, (err, result) => {
           if (err) reject(new Error(err.message));
           resolve(result);
         });
       });

       if (response.affectedRows == 0) {
         throw new Error("Profissional nao encontrado");
       }
       console.log("Profissional foi deletado com sucessos");
     } catch (err) {
     console.log(err);
      throw err;
     }
  }
  async EditarProfissional(data) {
    let query = "UPDATE tbl_profissional SET ";
    const values = [];
    let isFirstSet = true;
  
    if (data.nome != null || data.nome != undefined) {
      query += `nome = ?`;
      values.push(data.nome);
      isFirstSet = false;
    }
    if (data.email != null || data.email != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `email = ?`;
      values.push(data.email);
      isFirstSet = false;
    }
    if (data.telefone != null || data.telefone != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `telefone = ?`;
      values.push(data.telefone);
      isFirstSet = false;
    }
    if (data.endereco != null || data.endereco != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `endereco = ?`;
      values.push(data.endereco);
      isFirstSet = false;
    }
    if (data.cargo != null || data.cargo != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `cargo = ?`;
      values.push(data.cargo);
      isFirstSet = false;
    }

    if (data.salario != null || data.salario != undefined) {
      if (!isFirstSet) {
        query += ",";
      }
      query += `salario = ?`;
      values.push(data.salario);
    }
  
    query += ` WHERE id = ?`;
    values.push(data.id);
  
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
  
      if (response.affectedRows == 0) {
        throw new Error("Profissional nao encontrado");
      }
      console.log("Profissional foi editado com sucesso");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  
  

  

async BuscarFornecedor(criterio, termo) {
  let query = "SELECT * FROM tbl_fornecedor";

  if (termo) {
    query += ` WHERE nome LIKE '%${termo}%'`;
  }

  if (criterio) {
    switch (criterio) {
      case "nome":
        query += " ORDER BY nome";
        break;
      case "telefone":
        query += " ORDER BY telefone";
        break;
      case "endereco":
        query += " ORDER BY endereco";
        break;
      case "cnpj":
        query += " ORDER BY cnpj";
        break;
      // Adicione mais casos conforme necessário
      default:
        break;
    }
  }

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async NovoFornecedor(data) {
  try {
    const query =
      "INSERT INTO tbl_fornecedor (nome,cnpj,telefone,endereco) VALUES (?,?,?,?)";
    const nome = data.nome;
    const cnpj = data.cnpj;
    const telefone = data.telefone;
    const endereco = data.endereco;

    const response = await new Promise((resolve, reject) => {
      connection.query(
        query,
        [nome, cnpj, telefone, endereco],
        (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        }
      );
    });
    console.log("Fornecedor inserido com sucesso");
    return response;
  } catch (error) {
    console.log("Erro ao inserir Fornecedor :" + error);
    throw error;
  }
}

async DeletarFornecedor(id) {
  const query = `DELETE FROM tbl_fornecedor WHERE id = ?;`;
  try {
    const response = await new Promise((resolve, reject) => {
      connection.query(query, id, (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    });

    if (response.affectedRows == 0) {
      throw new Error("Fornecedor nao encontrado");
    }
    console.log("Fornecedor foi deletado com sucessos");
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async EditarFornecedor(data) {
  let query = "UPDATE tbl_fornecedor SET ";
  const values = [];
  let isFirstSet = true;

  if (data.nome != null || data.nome != undefined) {
    query += `nome = ?`;
    values.push(data.nome);
    isFirstSet = false;
  }
  if (data.cnpj != null || data.cnpj != undefined) {
    if (!isFirstSet) {
      query += ",";
    }
    query += `cnpj = ?`;
    values.push(data.cnpj);
    isFirstSet = false;
  }
  if (data.telefone != null || data.telefone != undefined) {
    if (!isFirstSet) {
      query += ",";
    }
    query += `telefone = ?`;
    values.push(data.telefone);
    isFirstSet = false;
  }
  if (data.endereco != null || data.endereco != undefined) {
    if (!isFirstSet) {
      query += ",";
    }
    query += `endereco = ?`;
    values.push(data.endereco);
  }

  query += ` WHERE id = ?`;
  values.push(data.id);

  try {
    const response = await new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    });

    if (response.affectedRows == 0) {
      throw new Error("Fornecedor nao encontrado");
    }
    console.log("Fornecedor foi editado com sucesso");
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async BuscarProdutosPorNome(nome) {
  return new Promise((resolve, reject) => {
    const query = `SELECT p.*, o.tipo AS tipo2, c.validade AS validade2, c.ingredientes AS ingredientes2 
                   FROM tbl_produtos p 
                   LEFT JOIN tbl_objeto o ON p.id = o.id 
                   LEFT JOIN tbl_consumivel c ON p.id = c.id 
                   WHERE p.nome LIKE '%${nome}%'`; // Usando o parâmetro nome na cláusula WHERE
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}  

async BuscarTodosProdutos() {
  return new Promise((resolve, reject) => {
    const query = "SELECT p.*, o.tipo AS tipo2, c.validade AS validade2, c.ingredientes AS ingredientes2 FROM tbl_produtos p LEFT JOIN tbl_objeto o ON p.id = o.id LEFT JOIN tbl_consumivel c ON p.id = c.id;";
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async BuscarTodosProdutosObjetos() {
  return new Promise((resolve, reject) => {
    const query = "SELECT p.*, o.tipo AS tipo2 FROM tbl_produtos p RIGHT JOIN tbl_objeto o ON p.id = o.id;";
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async BuscarTodosProdutosConsumiveis() {
  return new Promise((resolve, reject) => {
    const query = "SELECT p.*, c.validade AS validade2, c.ingredientes AS ingredientes2 FROM tbl_produtos p RIGHT JOIN tbl_consumivel c ON p.id = c.id;";
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async QuantidadeProdutosTabela() {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS total_produtos 
                   FROM (SELECT p.*, o.tipo AS tipo2, c.validade AS validade2, c.ingredientes AS ingredientes2 
                   FROM tbl_produtos p LEFT JOIN tbl_objeto o ON p.id = o.id LEFT JOIN tbl_consumivel c ON p.id = c.id ) 
                   AS subconsulta;`;
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
} 

async NovoProduto(data) {
  try {
    const query =
      "INSERT INTO tbl_produtos (nome,preco,estoque,descricao,marca,id_fornecedor) VALUES (?,?,?,?,?,?)";
    const nome = data.nome;
    const preco = data.preco;
    const estoque = data.estoque;
    const descricao = data.descricao;
    const marca = data.marca;
    const fornecedor = data.fornecedor;
    const tipo = data.tipo;

    const response = await new Promise((resolve, reject) => {
      connection.query(query, [nome, preco, estoque, descricao, marca, fornecedor], (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    });

    const lastInsertedId = await new Promise((resolve, reject) => {
      const queryLastId = "SELECT id FROM tbl_produtos ORDER BY id DESC LIMIT 1";
      connection.query(queryLastId, (err, result) => {
        if (err) reject(err);
        resolve(result[0].id); // Acessa o ID da primeira linha do resultado
      });
    });

    const query2 = "INSERT INTO tbl_objeto (id,tipo) VALUES (?,?)";

    const response3 = await new Promise((resolve, reject) => {
      connection.query(query2, [lastInsertedId, tipo], (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    });
    console.log("Produto inserido com sucesso");
    return response;
  } catch (error) {
    console.log("Erro ao inserir produto :" + error);
    throw error;
  }
}

async NovoProduto2(data) {
  try {
    const query =
      "INSERT INTO tbl_produtos (nome,preco,estoque,descricao,marca,id_fornecedor) VALUES (?,?,?,?,?,?)";
    const nome = data.nome;
    const preco = data.preco;
    const estoque = data.estoque;
    const descricao = data.descricao;
    const marca = data.marca;
    const fornecedor = data.fornecedor;
    const validade = data.validade;
    const ingredientes = data.ingredientes;

    const response = await new Promise((resolve, reject) => {
      connection.query(query, [nome, preco, estoque, descricao, marca, fornecedor], (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    });

    const lastInsertedId = await new Promise((resolve, reject) => {
      const queryLastId = "SELECT id FROM tbl_produtos ORDER BY id DESC LIMIT 1";
      connection.query(queryLastId, (err, result) => {
        if (err) reject(err);
        resolve(result[0].id); // Acessa o ID da primeira linha do resultado
      });
    });

    const query2 = "INSERT INTO tbl_consumivel (id,validade,ingredientes) VALUES (?,?,?)";

    const response3 = await new Promise((resolve, reject) => {
      connection.query(query2, [lastInsertedId, validade, ingredientes], (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    });
    console.log("Produto inserido com sucesso");
    return response3;
  } catch (error) {
    console.log("Erro ao inserir produto :" + error);
    throw error;
  }
}





}

module.exports = dbServices;
