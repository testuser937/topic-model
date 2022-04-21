namespace Tm.Domain
{
    public class MonitoringResult
    {
        public long Id { get; }

        public MonitoringStatus Status { get; }

        public string Topic { get; }

        public MonitoringResult(long id, MonitoringStatus status, string topic)
        {
            Id = id;
            Status = status;
            Topic = topic;
        }

        private MonitoringResult()
        {
        }
    }
}