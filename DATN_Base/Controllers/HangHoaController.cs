using DATN_Base.Models;
using Microsoft.AspNetCore.Mvc;


namespace DATN_Base.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class HangHoaController : ControllerBase
    {
        public static List<HangHoa> hangHoas = new List<HangHoa>();
        // GET: api/<HangHoaController>
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(hangHoas);
        }

        // GET api/<HangHoaController>/5
        [HttpGet("getById/{id}")]
        public IActionResult GetbyId(string id)
        {
            try
            {
                var hanghoa = hangHoas.FirstOrDefault(h => h.MaHangHoa == Guid.Parse(id));
                if (hanghoa == null) return NotFound();
                return Ok(hanghoa);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        // POST api/<HangHoaController>
        [HttpPost("create")]
        public IActionResult Create(HangHoaVM hangHoaVM)
        {
            var hanghoa = new HangHoa
            {
                MaHangHoa = Guid.NewGuid(),
                TenHangHoa = hangHoaVM.TenHangHoa,
                DonGia = hangHoaVM.DonGia,
            };
            hangHoas.Add(hanghoa);
            return Ok(new
            {
                Success = true, hanghoa
            });
        }

        // PUT api/<HangHoaController>/5
        [HttpPut("edit/{id}")]
        public IActionResult Edit(string id, HangHoa hangHoaEdit)
        {
            try
            {
                var hanghoa = hangHoas.FirstOrDefault(h => h.MaHangHoa == Guid.Parse(id));
                if (hanghoa == null) return NotFound();
                if (hanghoa.MaHangHoa != Guid.Parse(id))
                {
                    return BadRequest();
                }
                hanghoa.TenHangHoa = hangHoaEdit.TenHangHoa;
                hanghoa.DonGia = hangHoaEdit.DonGia;
                return Ok(hanghoa);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        // DELETE api/<HangHoaController>/5
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var isExist = hangHoas.FirstOrDefault(h => h.MaHangHoa == Guid.Parse(id));
                var hanghoa = hangHoas.FindAll(h => h.MaHangHoa != Guid.Parse(id));
                if (isExist == null)
                {
                    return NotFound();
                }
                else
                {
                    hangHoas = hanghoa;
                }
                return Ok(hangHoas);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
    }
}
