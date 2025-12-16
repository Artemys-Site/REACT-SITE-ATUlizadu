using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using ApiArtemys.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ApiArtemys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacinasController : ControllerBase
    {
        private readonly ArtemysDbContext _context;

        public VacinasController(ArtemysDbContext context)
        {
            _context = context;
        }

        // GET: api/Vacinas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetVacinas()
        {
            try
            {
                var vacinas = await _context.Vacinas.ToListAsync();
                
                return Ok(vacinas.Select(v => new
                {
                    IdVacina = v.IdVacina,
                    TipoVacina = string.IsNullOrWhiteSpace(v.TipoVacina) ? null : v.TipoVacina,
                    DoseVacina = string.IsNullOrWhiteSpace(v.DoseVacina) ? null : v.DoseVacina
                }));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"=== ERRO em GET /api/Vacinas ===");
                Console.WriteLine($"Mensagem: {ex.Message}");
                return StatusCode(500, new { message = "Erro interno do servidor ao buscar vacinas", error = ex.Message });
            }
        }

        // GET: api/Vacinas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetVacina(int id)
        {
            try
            {
                Console.WriteLine($"=== GET /api/Vacinas/{id} ===");

                var vacina = await _context.Vacinas
                    .FirstOrDefaultAsync(v => v.IdVacina == id);

                if (vacina == null)
                {
                    Console.WriteLine($"Vacina com ID {id} não encontrada");
                    return NotFound(new { message = "Vacina não encontrada" });
                }

                Console.WriteLine($"Vacina encontrada: ID={vacina.IdVacina}, Tipo={vacina.TipoVacina}, Dose={vacina.DoseVacina}");

                return Ok(new
                {
                    IdVacina = vacina.IdVacina,
                    TipoVacina = string.IsNullOrWhiteSpace(vacina.TipoVacina) ? null : vacina.TipoVacina,
                    DoseVacina = string.IsNullOrWhiteSpace(vacina.DoseVacina) ? null : vacina.DoseVacina
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"=== ERRO em GET /api/Vacinas/{id} ===");
                Console.WriteLine($"Mensagem: {ex.Message}");
                return StatusCode(500, new { message = "Erro interno do servidor ao buscar vacina", error = ex.Message });
            }
        }

        // GET: api/Vacinas/pet/{petId} - Buscar todas as vacinas de um pet
        [HttpGet("pet/{petId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetVacinasByPet(int petId)
        {
            try
            {
                Console.WriteLine($"=== GET /api/Vacinas/pet/{petId} ===");

                // Validar petId
                if (petId <= 0)
                {
                    Console.WriteLine($"Pet ID inválido: {petId}");
                    return BadRequest(new { message = "ID do pet inválido" });
                }

                // Verificar se o pet existe
                var pet = await _context.Pets.FindAsync(petId);
                if (pet == null)
                {
                    Console.WriteLine($"Pet com ID {petId} não encontrado");
                    return NotFound(new { message = "Pet não encontrado" });
                }

                Console.WriteLine($"Pet encontrado: ID={pet.IdPet}, Nome={pet.NPet}");

                // Carregar todas as vacinas com a coleção de pets
                var todasVacinas = await _context.Vacinas
                    .Include(v => v.FkPetIdPets)
                    .ToListAsync();

                Console.WriteLine($"Total de vacinas no banco: {todasVacinas.Count}");

                // Filtrar vacinas que estão associadas ao pet (client-side evaluation)
                var vacinas = todasVacinas
                    .Where(v => v.FkPetIdPets != null && v.FkPetIdPets.Any(p => p.IdPet == petId))
                    .ToList();

                Console.WriteLine($"Encontradas {vacinas.Count} vacinas para o pet ID={petId}");

                // Retornar apenas os dados básicos
                var vacinasResponse = vacinas.Select(v => new
                {
                    IdVacina = v.IdVacina,
                    TipoVacina = string.IsNullOrWhiteSpace(v.TipoVacina) ? null : v.TipoVacina,
                    DoseVacina = string.IsNullOrWhiteSpace(v.DoseVacina) ? null : v.DoseVacina
                }).ToList();

                Console.WriteLine($"Retornando {vacinasResponse.Count} vacinas");
                Console.WriteLine("=== GET /api/Vacinas/pet/{petId} - Sucesso ===");

                return Ok(vacinasResponse);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"=== ERRO em GET /api/Vacinas/pet/{petId} ===");
                Console.WriteLine($"Mensagem: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { message = "Erro interno do servidor ao buscar vacinas do pet", error = ex.Message });
            }
        }

        // PUT: api/Vacinas/5
        [HttpPut("{id}")]
        [DisableModelValidation]
        public async Task<IActionResult> PutVacina(int id, [FromBody] VacinaUpdateDto vacinaDto)
        {
            try
            {
                Console.WriteLine($"=== PUT /api/Vacinas/{id} ===");

                if (vacinaDto == null)
                {
                    Console.WriteLine("ERRO: vacinaDto é null");
                    return BadRequest(new { message = "Dados não fornecidos" });
                }

                Console.WriteLine($"VacinaDto.TipoVacina: '{vacinaDto.TipoVacina}'");
                Console.WriteLine($"VacinaDto.DoseVacina: '{vacinaDto.DoseVacina}'");

                // Buscar a vacina existente
                var vacina = await _context.Vacinas
                    .FirstOrDefaultAsync(v => v.IdVacina == id);

                if (vacina == null)
                {
                    return NotFound(new { message = "Vacina não encontrada" });
                }

                // Verificar se há dados para atualizar
                var temDadosParaAtualizar = 
                    !string.IsNullOrEmpty(vacinaDto.TipoVacina) ||
                    !string.IsNullOrEmpty(vacinaDto.DoseVacina);

                if (!temDadosParaAtualizar)
                {
                    return Ok(vacina);
                }

                // Atualizar apenas os campos que foram enviados
                if (!string.IsNullOrEmpty(vacinaDto.TipoVacina))
                {
                    vacina.TipoVacina = vacinaDto.TipoVacina;
                }

                if (!string.IsNullOrEmpty(vacinaDto.DoseVacina))
                {
                    vacina.DoseVacina = vacinaDto.DoseVacina;
                }

                // Salvar alterações
                await _context.SaveChangesAsync();

                Console.WriteLine($"Vacina ID={id} atualizada com sucesso");
                Console.WriteLine("=== PUT /api/Vacinas/{id} - Sucesso ===");

                // Buscar vacina atualizada e retornar
                var vacinaAtualizada = await _context.Vacinas
                    .FirstOrDefaultAsync(v => v.IdVacina == id);

                if (vacinaAtualizada == null)
                {
                    return NotFound(new { message = "Vacina não encontrada após atualização" });
                }

                return Ok(new
                {
                    IdVacina = vacinaAtualizada.IdVacina,
                    TipoVacina = string.IsNullOrWhiteSpace(vacinaAtualizada.TipoVacina) ? null : vacinaAtualizada.TipoVacina,
                    DoseVacina = string.IsNullOrWhiteSpace(vacinaAtualizada.DoseVacina) ? null : vacinaAtualizada.DoseVacina
                });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacinaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"=== ERRO em PUT /api/Vacinas/{id} ===");
                Console.WriteLine($"Mensagem: {ex.Message}");
                return BadRequest(new { message = "Erro ao atualizar vacina", error = ex.Message });
            }
        }

        // POST: api/Vacinas
        [HttpPost]
        [DisableModelValidation]
        public async Task<ActionResult<object>> PostVacina([FromBody] VacinaCreateDto vacinaDto)
        {
            try
            {
                Console.WriteLine("=== POST /api/Vacinas - Início ===");

                if (vacinaDto == null)
                {
                    Console.WriteLine("Erro: vacinaDto é null");
                    return BadRequest(new { message = "Dados não fornecidos" });
                }

                Console.WriteLine($"Dados recebidos: TipoVacina={vacinaDto.TipoVacina}, DoseVacina={vacinaDto.DoseVacina}, FkPetId={vacinaDto.FkPetId}");

                // Verificar se o pet existe (se foi fornecido)
                Pet pet = null;
                if (vacinaDto.FkPetId != null && vacinaDto.FkPetId > 0)
                {
                    pet = await _context.Pets.FindAsync(vacinaDto.FkPetId);
                    if (pet == null)
                    {
                        Console.WriteLine($"Erro: Pet com ID {vacinaDto.FkPetId} não encontrado");
                        return NotFound(new { message = "Pet não encontrado" });
                    }
                    Console.WriteLine($"Pet encontrado: ID={pet.IdPet}, Nome={pet.NPet}");
                }

                // Criar nova vacina
                var vacina = new Vacina
                {
                    TipoVacina = vacinaDto.TipoVacina ?? "",
                    DoseVacina = vacinaDto.DoseVacina ?? ""
                };

                // Adicionar pet à coleção FkPetIdPets se foi fornecido
                if (pet != null)
                {
                    Console.WriteLine("Adicionando pet à coleção FkPetIdPets...");
                    vacina.FkPetIdPets.Add(pet);
                    Console.WriteLine($"Pet ID={pet.IdPet} adicionado à coleção. Total de pets na coleção: {vacina.FkPetIdPets.Count}");
                }

                // Adicionar a vacina ao contexto
                Console.WriteLine("Adicionando vacina ao contexto...");
                _context.Vacinas.Add(vacina);

                // Salvar alterações
                Console.WriteLine("Salvando alterações no banco...");
                await _context.SaveChangesAsync();
                Console.WriteLine($"Vacina salva com sucesso! ID={vacina.IdVacina}");

                // Verificar se a relação foi salva corretamente (se houver pet)
                if (pet != null)
                {
                    await _context.Entry(vacina).Collection(v => v.FkPetIdPets).LoadAsync();
                    Console.WriteLine($"✅ Relação verificada: Vacina ID={vacina.IdVacina} está associada a {vacina.FkPetIdPets.Count} pet(s)");
                    foreach (var p in vacina.FkPetIdPets)
                    {
                        Console.WriteLine($"   - Pet ID={p.IdPet}, Nome={p.NPet}");
                    }
                }

                Console.WriteLine("=== POST /api/Vacinas - Sucesso ===");

                // Retornar resposta
                var responseVacina = new
                {
                    IdVacina = vacina.IdVacina,
                    TipoVacina = string.IsNullOrWhiteSpace(vacina.TipoVacina) ? null : vacina.TipoVacina,
                    DoseVacina = string.IsNullOrWhiteSpace(vacina.DoseVacina) ? null : vacina.DoseVacina
                };

                Console.WriteLine($"Retornando resposta com ID={vacina.IdVacina}");
                return CreatedAtAction("GetVacina", new { id = vacina.IdVacina }, responseVacina);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"=== ERRO em POST /api/Vacinas ===");
                Console.WriteLine($"Mensagem: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return BadRequest(new { message = "Erro ao criar vacina", error = ex.Message, details = ex.StackTrace });
            }
        }

        // DELETE: api/Vacinas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVacina(int id)
        {
            try
            {
                Console.WriteLine($"=== DELETE /api/Vacinas/{id} ===");

                // Carregar a vacina com todas as suas relações
                var vacina = await _context.Vacinas
                    .Include(v => v.FkPetIdPets)
                    .FirstOrDefaultAsync(v => v.IdVacina == id);

                if (vacina == null)
                {
                    Console.WriteLine($"Vacina com ID {id} não encontrada");
                    return NotFound(new { message = "Vacina não encontrada" });
                }

                Console.WriteLine($"Vacina encontrada: ID={vacina.IdVacina}, Tipo={vacina.TipoVacina}");

                // Remover relações com pets antes de excluir
                if (vacina.FkPetIdPets != null && vacina.FkPetIdPets.Any())
                {
                    Console.WriteLine($"Removendo {vacina.FkPetIdPets.Count} relação(ões) com pet(s)...");
                    vacina.FkPetIdPets.Clear();
                }

                // Salvar as remoções de relações primeiro
                await _context.SaveChangesAsync();
                Console.WriteLine("Relações removidas com sucesso");

                // Agora podemos excluir a vacina com segurança
                Console.WriteLine("Excluindo vacina do banco de dados...");
                _context.Vacinas.Remove(vacina);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Vacina ID={id} excluída com sucesso");
                Console.WriteLine("=== DELETE /api/Vacinas/{id} - Sucesso ===");

                return NoContent();
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine($"=== ERRO em DELETE /api/Vacinas/{id} ===");
                Console.WriteLine($"Erro ao excluir vacina: {dbEx.Message}");
                if (dbEx.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {dbEx.InnerException.Message}");
                }

                return StatusCode(500, new
                {
                    message = "Erro ao excluir vacina. A vacina pode estar relacionada a outros registros no banco de dados.",
                    error = dbEx.InnerException?.Message ?? dbEx.Message
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"=== ERRO em DELETE /api/Vacinas/{id} ===");
                Console.WriteLine($"Mensagem: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new
                {
                    message = "Erro interno do servidor ao excluir vacina",
                    error = ex.Message
                });
            }
        }

        private bool VacinaExists(int id)
        {
            return _context.Vacinas.Any(e => e.IdVacina == id);
        }
    }

    // DTOs para criação e atualização de vacina
    public class VacinaCreateDto
    {
        public string TipoVacina { get; set; }
        public string DoseVacina { get; set; }
        public int? FkPetId { get; set; } // ID do pet (opcional - pode criar vacina sem associar a um pet)
    }

    public class VacinaUpdateDto
    {
        public string TipoVacina { get; set; }
        public string DoseVacina { get; set; }
    }
}



