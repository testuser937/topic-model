using System;
using Npgsql;

namespace Tm.Implementation
{
    public class DbContext : IDisposable
    {
        private readonly string _connectionString;
        private NpgsqlConnection _connection;

        public DbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public NpgsqlConnection Connection
        {
            get
            {
                if (_connection == null)
                {
                    _connection = new NpgsqlConnection(_connectionString);
                    _connection.Open();
                }

                return _connection;
            }
        }

        public void Dispose()
        {
            _connection?.Dispose();
        }
    }
}